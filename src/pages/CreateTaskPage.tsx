import { useState } from "react"
import { useTasks } from "../context/TasksContext"
import { TaskStatus, TaskPriority, type TaskCategoryType, type TaskPriorityType, TaskCategory } from "../types/enums"
import { useNavigate } from "react-router-dom"
import type { ITask } from "../types/task"

const CreateTaskPage = () => {
    const { addTask } = useTasks()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<Omit<ITask, "id">>({
        title: "",
        description: "",
        status: TaskStatus.TO_DO,
        priority: TaskPriority.MEDIUM,
        tags: []
    })

    const [newTag, setNewTag] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addTask(formData)
        navigate("/")
    }

    const handleAddTag = () => {
        if (newTag && !formData.tags.includes(newTag as TaskCategoryType)) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag as TaskCategoryType]
            })
            setNewTag("")
        }
    }

    const handleRemoveTag = (tag: TaskCategoryType) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((t) => t !== tag)
        })
    }

    const priorityTitles = {
        [TaskPriority.LOW]: <p className="text-green-500">Низкий</p>,
        [TaskPriority.MEDIUM]: <p className="text-yellow-500">Средний</p>,
        [TaskPriority.HIGH]: <p className="text-red-500">Высокий</p>
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Создать задачу</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Название</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => (
                            setFormData({ ...formData, title: e.target.value })
                        )}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Описание</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Приоритет</label>
                    <select
                        value={formData.priority}
                        onChange={(e) => (
                            setFormData({
                                ...formData,
                                priority: e.target.value as TaskPriorityType,
                            }))
                        }
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {Object.values(TaskPriority).map((priority) => (
                            <option key={priority} value={priority}>
                                {priorityTitles[priority]}
                            </option>
                        ))}
                    </select>
                </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Теги</label>
                        <div className="flex gap-2 mb-2">
                            <select
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
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
                                    x
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
                            Добавить задачу
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
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

export default CreateTaskPage