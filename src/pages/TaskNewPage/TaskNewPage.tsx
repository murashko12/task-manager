
import { useNavigate } from 'react-router-dom'
import TaskForm from '@/entities/task/ui/TaskForm'
import type { ITask } from '@/shared/types/task'
import { useTasks } from '@/entities/task/model/useTasks'

const TaskNewPage = () => {

    const { addTask } = useTasks()
    const navigate = useNavigate()

    const handleSubmit = (data: Omit<ITask, 'id'>) => {
        addTask(data)
        navigate('/')
    }

    return (
        <TaskForm
            onSubmit={handleSubmit}
            submitButtonText="Добавить задачу"
        />
    )
}

export default TaskNewPage