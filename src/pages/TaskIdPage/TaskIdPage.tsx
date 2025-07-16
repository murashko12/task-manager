import { Link, useNavigate, useParams } from "react-router-dom"

import { TaskPriority, type TaskPriorityType } from "@/shared/types/enums"
import { useState } from "react"
import { useTasks } from "@/entities/task/model/useTasks"

const TaskIdPage = () => {
    const { id } = useParams<{ id: string }>()
    const { tasks, deleteTask } = useTasks()
    const taskId = id ? parseInt(id) : NaN
    const task = tasks.find((task) => (task.id === taskId))
    const [isDeleting, setIsDeleting] = useState(false)
    const navigate = useNavigate()

    const priorityTitles = {
        [TaskPriority.LOW]: <span className="text-green-500">Низкий</span>,
        [TaskPriority.MEDIUM]: <span className="text-yellow-500">Средний</span>,
        [TaskPriority.HIGH]: <span className="text-red-500">Высокий</span>
    }

    const handleDelete = () => {
        setIsDeleting(true)
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            deleteTask(taskId)
            navigate('/')
        } else {
            setIsDeleting(false)
        }
    }

    if (!task) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Задача не найдена</h1>
                    <Link 
                        to="/" 
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Вернуться к списку задач
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">{task.title}</h1>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Описание</label>
                    <div className="p-3 bg-gray-50 rounded border">
                        <p className="text-gray-700">{task.description || "Нет описания"}</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Статус</label>
                        <div className="px-3 py-1 bg-blue-100 rounded-full inline-block">
                            {task.status === 'TO_DO' && 'К выполнению'}
                            {task.status === 'IN_PROGRESS' && 'В работе'}
                            {task.status === 'DONE' && 'Выполнено'}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Приоритет</label>
                        <div className="px-3 py-1 bg-gray-100 rounded-full inline-block">
                            {priorityTitles[task.priority as TaskPriorityType]}
                        </div>
                    </div>
                </div>
                
                {task.tags.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Теги</label>
                        <div className="flex flex-wrap gap-2">
                            {task.tags.map(tag => (
                                <span 
                                    key={tag} 
                                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 mt-6">
                        <Link
                            to={`/task/${task.id}/edit`}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center transition-colors"
                        >
                            Редактировать
                        </Link>
                        <Link
                            to="/"
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded text-center transition-colors"
                        >
                            На главную
                        </Link>
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors flex items-center justify-center gap-2 w-full cursor-pointer"
                    >
                        {isDeleting ? (
                            <>
                                Удаление...
                            </>
                        ) : (
                            'Удалить задачу'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskIdPage