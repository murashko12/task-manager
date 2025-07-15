import { useNavigate, useParams } from "react-router-dom"
import { useTasks } from "@/context/TasksContext"
import { useEffect, useState } from "react"
import type { ITask } from "@/types/task"
import { TaskStatus, TaskPriority, TaskCategory, type TaskCategoryType, type TaskPriorityType, type TaskStatusType } from "@/types/enums"

const TaskIdEditPage = () => {
    const { id } = useParams<{ id: string }>()
    const { updateTask, getTaskById } = useTasks()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState<ITask | null>(null)
    const [newTag, setNewTag] = useState<TaskCategoryType | "">("")

    useEffect(() => {
        if (!id) return
        
        const taskId = parseInt(id)
        const task = getTaskById(taskId)
        
        if (task) {
            setFormData(task)
        } else {
            navigate("/not-found", { replace: true })
        }
    }, [id, getTaskById, navigate])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return
        
        updateTask(formData.id, formData)
        navigate(`/task/${formData.id}`)
    }

    const handleAddTag = () => {
        if (newTag && formData && !formData.tags.includes(newTag)) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag]
            })
            setNewTag("")
        }
    }

    const handleRemoveTag = (tag: TaskCategoryType) => {
        if (!formData) return
        
        setFormData({
            ...formData,
            tags: formData.tags.filter(t => t !== tag)
        })
    }

    const priorityTitles = {
        [TaskPriority.LOW]: "Низкий",
        [TaskPriority.MEDIUM]: "Средний",
        [TaskPriority.HIGH]: "Высокий"
    }

    const statusTitles = {
        [TaskStatus.TO_DO]: "К выполнению",
        [TaskStatus.IN_PROGRESS]: "В работе",
        [TaskStatus.DONE]: "Выполнено"
    }

    if (!formData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Загрузка...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Редактировать задачу</h1>
                
                <form onSubmit={handleSubmit}>
                    {/* Поле названия */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Название</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Поле описания */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Описание</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                        />
                    </div>

                    {/* Селектор статуса */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Статус</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as TaskStatusType})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.values(TaskStatus).map((status) => (
                                <option key={status} value={status}>
                                    {statusTitles[status as TaskStatusType]}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Селектор приоритета */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Приоритет</label>
                        <select
                            value={formData.priority}
                            onChange={(e) => setFormData({...formData, priority: e.target.value as TaskPriorityType})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.values(TaskPriority).map((priority) => (
                                <option key={priority} value={priority}>
                                    {priorityTitles[priority as TaskPriorityType]}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Поле тегов */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Теги</label>
                        <div className="flex gap-2 mb-2">
                            <select
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value as TaskCategoryType)}
                                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Выберите тег</option>
                                {Object.values(TaskCategory).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleAddTag}
                                disabled={!newTag}
                                className="px-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1 text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors"
                        >
                            Сохранить изменения
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/task/${formData.id}`)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition-colors"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskIdEditPage