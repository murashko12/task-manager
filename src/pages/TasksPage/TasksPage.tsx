import { useMemo, useState } from "react"
import TaskItem from "@/entities/task/ui/TaskItem"
import TaskList from "@/entities/task/ui/TaskList"
import { TaskStatus, type TaskStatusType} from "@/shared/types/enums"
import type { ITask } from "@/shared/types/task"
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
import useDebounce from "@/shared/lib/useDebounce"
import { useTasks } from "@/entities/task/model/useTasks"
import Header from "@/widgets/Header"
import { useAppSelector } from "@/app/hooks"

const TasksPage = () => {
    const { tasks, updateTask, reorderTasks, isFetching } = useTasks()
    const [ activeTask, setActiveTask ] = useState<ITask | null>(null)
    
    const [ isDragging, setIsDragging ] = useState(false)

    const { searchTerm, tagFilter } = useAppSelector(state => state.filters)
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
        setIsDragging(true)
        const { active } = event
        const task = tasks.find((t) => t.id === active.id)
        if (task) setActiveTask(task)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        setIsDragging(false)
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (active.data.current?.status === over.data.current?.status) {
            const oldIndex = tasks.findIndex((task) => task.id === activeId)
            const newIndex = tasks.findIndex((task) => task.id === overId)
            await reorderTasks(arrayMove(tasks, oldIndex, newIndex))
            return
        }

        const newStatus = over.data.current?.status as TaskStatusType
        if (!newStatus || !Object.values(TaskStatus).includes(newStatus)) return

        await updateTask(activeId as number, { status: newStatus })
        setActiveTask(null)
    }

    if (isFetching && !isDragging) {
        return <div className="w-full min-h-screen bg-gray-100 p-5">Загрузка...</div>
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-5 flex flex-col gap-5">
            <Header/>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <main className="flex flex-col lg:flex-row gap-5 flex-1">
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
                </main>
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