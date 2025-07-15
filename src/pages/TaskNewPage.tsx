import { useTasks } from '@/context/TasksContext'
import { useNavigate } from 'react-router-dom'
import TaskForm from '@/components/TaskForm'
import type { ITask } from '@/types/task'

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