import { useMemo, useState } from "react"
import TaskItem from "../components/TaskItem"
import TaskList from "../components/TaskList"
import { TaskStatus, type TaskStatusType } from "../types/enums"
import { useTasks } from "../context/TasksContext"
import { Link } from "react-router-dom"
import type { ITask } from "../types/task"

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

const TasksPage = () => {
    const { tasks, updateTask, reorderTasks } = useTasks()
    const [activeTask, setActiveTask] = useState<ITask | null>(null)

    const tasksByStatus = useMemo(() => {
        return {
            [TaskStatus.TO_DO]: tasks.filter((task) => task.status === TaskStatus.TO_DO),
            [TaskStatus.IN_PROGRESS]: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
            [TaskStatus.DONE]: tasks.filter((task) => task.status === TaskStatus.DONE),
        }
    }, [tasks])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
            distance: 5,
        }})
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
            <div className="flex items-center justify-between">
                <input 
                    type="text" 
                    className="border-2 rounded-lg p-2 outline-none w-64"
                />
                <Link to="/create_task">
                    <button className="border-2 rounded-lg p-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600">
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
                <div className="flex gap-5 flex-1">
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