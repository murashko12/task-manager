import { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation, useReorderTasksMutation } from '@/services/tasksApi'
import type { ITask } from '@/types/task'

export const useTasks = () => {
    
    const { data: tasks = [], isLoading, isError } = useGetTasksQuery()
    const [addTaskMutation] = useAddTaskMutation()
    const [updateTaskMutation] = useUpdateTaskMutation()
    const [deleteTaskMutation] = useDeleteTaskMutation()
    const [reorderTasksMutation] = useReorderTasksMutation()

    const addTask = async (task: Omit<ITask, 'id'>) => {
        await addTaskMutation(task)
    }

    const updateTask = async (id: number, changes: Partial<ITask>) => {
        await updateTaskMutation({ id, changes })
    }

    const deleteTask = async (id: number) => {
        await deleteTaskMutation(id)
    }

    const reorderTasks = async (newOrder: ITask[]) => {
        await reorderTasksMutation(newOrder)
    }

    const getTaskById = (id: number) => {
        return tasks.find(task => task.id === id)
    }

    return {
        tasks,
        isLoading,
        isError,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
        getTaskById
    }
}