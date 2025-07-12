import { Link } from "react-router-dom"
import type { ITask } from "../types/task"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskPriority } from "../types/enums"

interface TaskItemProps extends ITask {
    isDragging?: boolean
}

const TaskItem = ({ 
    id, 
    title,
    priority, 
    tags, 
    status,
    isDragging = false 
}: TaskItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id,
        data: {
            type: "task",
            status
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const priorityTitles = {
        [TaskPriority.LOW]: <p className="text-green-500">Низкий</p>,
        [TaskPriority.MEDIUM]: <p className="text-yellow-500">Средний</p>,
        [TaskPriority.HIGH]: <p className="text-red-500">Высокий</p>
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`p-3 border rounded-lg bg-white cursor-grab active:cursor-grabbing ${
                isDragging ? "shadow-lg opacity-70" : "shadow"
            }`}
        >
            <h3 className="font-bold">{title}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex gap-2">Приоритет: {priorityTitles[priority]}</span>
                <Link 
                    to={`/task/${id}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
                        Открыть
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default TaskItem