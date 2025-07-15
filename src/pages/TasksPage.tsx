import { useMemo, useState } from "react"
import TaskItem from "@components/TaskItem"
import TaskList from "@components/TaskList"
import { TaskStatus, TaskCategory, type TaskStatusType, type TaskCategoryType } from "@/types/enums"
import { useTasks } from "@/context/TasksContext"
import { Link } from "react-router-dom"
import type { ITask } from "@/types/task"
import { 
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
    closestCorners
} from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import useDebounce from "@/hooks/useDebounce"

const TasksPage = () => {
    const { tasks, updateTask, reorderTasks } = useTasks()
    const [activeTask, setActiveTask] = useState<ITask | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [tagFilter, setTagFilter] = useState<TaskCategoryType | "all">("all")

    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    const filteredTasks = useMemo(() => {
        let result = tasks
        
        if (debouncedSearchTerm) {
            result = result.filter(task => 
                task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            )
        }
        
        if (tagFilter !== "all") {
            result = result.filter(task => 
                task.tags.includes(tagFilter)
            )
        }
        
        return result
    }, [tasks, debouncedSearchTerm, tagFilter])

    const tasksByStatus = useMemo(() => {
        return {
            [TaskStatus.TO_DO]: filteredTasks.filter((task) => task.status === TaskStatus.TO_DO),
            [TaskStatus.IN_PROGRESS]: filteredTasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
            [TaskStatus.DONE]: filteredTasks.filter((task) => task.status === TaskStatus.DONE),
        }
    }, [filteredTasks])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            }
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        const task = tasks.find((t) => t.id === active.id)
        if (task) setActiveTask(task)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (active.data.current?.status === over.data.current?.status) {
            const oldIndex = tasks.findIndex((task) => task.id === activeId)
            const newIndex = tasks.findIndex((task) => task.id === overId)
            reorderTasks(arrayMove(tasks, oldIndex, newIndex))
            return
        }

        const newStatus = over.data.current?.status as TaskStatusType
        if (!newStatus || !Object.values(TaskStatus).includes(newStatus)) return

        updateTask(activeId as number, { status: newStatus })
        setActiveTask(null)
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-5 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div className="flex gap-3 ">
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg p-2 outline-none flex-1 bg-white w-[400px]"
                        placeholder="Поиск по названию..."
                    />
                    
                    <select
                        value={tagFilter}
                        onChange={(e) => setTagFilter(e.target.value as TaskCategoryType | "all")}
                        className="border rounded-lg p-2 outline-none bg-white"
                    >
                        <option value="all">Все теги</option>
                        {Object.values(TaskCategory).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                
                <Link to="/create_task" className="w-full md:w-auto">
                    <button className="border-2 rounded-lg p-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 w-full">
                        Добавить задачу
                    </button>
                </Link>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-col md:flex-row gap-5 flex-1">
                    {Object.values(TaskStatus).map((status) => (
                        <TaskList key={status} status={status}>
                            <SortableContext 
                                items={tasksByStatus[status].map((task) => task.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {tasksByStatus[status].map((task) => (
                                    <TaskItem key={task.id} {...task} />
                                ))}
                            </SortableContext>
                        </TaskList>
                    ))}
                </div>

                <DragOverlay>
                    {activeTask && (
                        <TaskItem {...activeTask} isDragging />
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    )
}

export default TasksPage