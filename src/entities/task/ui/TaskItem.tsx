import { Link } from "react-router-dom"
import type { ITask } from "@/shared/types/task"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskPriority } from "@/shared/types/enums"

interface TaskItemProps extends ITask {
    isDragging?: boolean
}

const TaskItem = ({ 
    id, 
    title,
    priority, 
    tags, 
    status,
    createdAt,
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
        [TaskPriority.LOW]: <span className="text-green-500">Низкий</span>,
        [TaskPriority.MEDIUM]: <span className="text-yellow-500">Средний</span>,
        [TaskPriority.HIGH]: <span className="text-red-500">Высокий</span>
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
        
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit'
        }
        
        const formattedDate = date.toLocaleDateString('ru-RU', dateOptions)
        const formattedTime = date.toLocaleTimeString('ru-RU', timeOptions)
        
        return `${formattedDate}, ${formattedTime}`
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
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold flex-1">{title}</h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(createdAt)}
                </span>
            </div>
            
            <div className="flex flex-wrap gap-1 my-2">
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
                <div className="text-sm text-gray-500 flex gap-2">
                    Приоритет: {priorityTitles[priority]}
                </div>
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