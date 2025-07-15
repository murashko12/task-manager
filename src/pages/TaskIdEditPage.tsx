import { useParams, useNavigate } from 'react-router-dom'
import { useTasks } from '@/context/TasksContext'
import TaskForm from '@/components/TaskForm'
import type { ITask } from '@/types/task'

const TaskIdEditPage = () => {
    
    const { id } = useParams<{ id: string }>()
    const { updateTask, getTaskById } = useTasks()
    const navigate = useNavigate()

    const task = id ? getTaskById(parseInt(id)) : null

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