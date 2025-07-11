import { Link, useParams } from "react-router-dom"
import { useTasks } from "../context/TasksContext"

const TaskIdPage = () => {

    const { id } = useParams<{ id: string }>()
    const { tasks } = useTasks()
    const taskId = id ? parseInt(id) : NaN
    const task = tasks.find((task) => (task.id === taskId))

    if (!task) {
        return <>Задача не найдена</>
    }

    return (<div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
            
            <div className="mb-4">
                <span className="font-semibold">Описание:</span>
                <p className="mt-1">{task.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
                <div>
                    <span className="font-semibold">Статус:</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 rounded">
                        {task.status}
                    </span>
                </div>
                
                <div>
                    <span className="font-semibold">Приоритет:</span>
                    <span className="ml-2 px-2 py-1 bg-yellow-100 rounded">
                        {task.priority}
                    </span>
                </div>
            </div>
            
            {task.tags.length > 0 && (
                <div>
                    <span className="font-semibold">Теги:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {task.tags.map(tag => (
                            <span 
                                key={tag} 
                                className="px-2 py-1 bg-gray-200 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <Link
                to={`/task/${task.id}/edit`}
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
            >
                Редактировать
            </Link>
        </div>
    )
}

export default TaskIdPage
