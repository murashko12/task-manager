import { useParams, useNavigate } from 'react-router-dom'

import TaskForm from '@/entities/task/ui/TaskForm'
import type { ITask } from '@/shared/types/task'
import { useTasks } from '@/entities/task/model/useTasks'

const TaskIdEditPage = () => {

    const { id } = useParams<{ id: string }>()
    const { updateTask, getTaskById, isLoading } = useTasks()
    const navigate = useNavigate()

    const task = id ? getTaskById(parseInt(id)) : null

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (!task) {
        navigate('/not-found', { replace: true })
        return null
    }

    const handleSubmit = (data: Omit<ITask, 'id'>) => {
        updateTask(task.id, { ...task, ...data })
        navigate(`/task/${task.id}`)
    }

    return (
        <TaskForm
            defaultValues={task}
            onSubmit={handleSubmit}
            submitButtonText="Сохранить изменения"
        />
    )
}

export default TaskIdEditPage