import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { 
    TaskStatus, 
    TaskPriority, 
    TaskCategory, 
    type TaskCategoryType, 
    type TaskPriorityType, 
} from '@/shared/types/enums'
import type { ITask } from '@/shared/types/task'
import { priorityTitles } from '@/entities/task/constants'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { Select } from '@/shared/ui/Select'
import { IoIosClose } from 'react-icons/io'


interface TaskFormProps {
    defaultValues?: Omit<ITask, 'id'> | ITask
    onSubmit: (data: Omit<ITask, 'id'>) => void
    submitButtonText: string
    loading?: boolean
}

const TaskForm = ({
    defaultValues = {
        title: '',
        description: '',
        status: TaskStatus.TO_DO,
        priority: TaskPriority.MEDIUM,
        tags: [],
        createdAt: new Date().toISOString()
    },
    onSubmit,
    submitButtonText,
    loading = false
}: TaskFormProps) => {
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Omit<ITask, 'id'>>({
        defaultValues
    })

    const tags = watch('tags')

    const handleAddTag = (tag: TaskCategoryType) => {
        if (!tags.includes(tag)) {
            setValue('tags', [...tags, tag])
        }
    }

    const handleRemoveTag = (tag: TaskCategoryType) => {
        setValue(
            'tags',
            tags.filter(t => t !== tag)
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">
                {submitButtonText === 'Сохранить изменения' ? 'Редактировать задачу' : 'Создать задачу'}
            </h1>
        
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Поле названия */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Название</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Название обязательно' }}
                        render={({ field }) => (
                            <div>
                                <Input
                                    {...field}
                                    type="text"
                                    disabled={loading}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Поле описания */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Описание</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                rows={4}
                                disabled={loading}
                            />
                        )}
                    />
                </div>

                {/* Селектор приоритета */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Приоритет</label>
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} disabled={loading}>
                                {Object.values(TaskPriority).map(priority => (
                                    <option key={priority} value={priority}>
                                    {priorityTitles[priority as TaskPriorityType]}
                                    </option>
                                ))}
                            </Select>
                        )}
                    />
                </div>

                {/* Поле тегов */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Теги</label>
                    <div className="flex gap-2 mb-2">
                        <Select
                            onChange={e => {
                                if (e.target.value) {
                                    handleAddTag(e.target.value as TaskCategoryType);
                                }
                            }}
                            disabled={loading}
                            defaultValue=""
                        >
                            <option value="">Выберите тег</option>
                            {Object.values(TaskCategory).map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1 text-sm"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-red-500 hover:text-red-700 "
                                    disabled={loading}
                                >
                                    <IoIosClose />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <button
                        type="submit"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors disabled:bg-gray-300"
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : submitButtonText}
                    </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition-colors"
                            disabled={loading}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm