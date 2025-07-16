import {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useReorderTasksMutation,
} from '@/services/tasksApi'
import type { ITask } from '@/types/task'

export const useTasks = () => {
    
    const { data: tasks = [], isLoading, isError, refetch } = useGetTasksQuery()
    const [addTaskMutation, { isLoading: isAdding }] = useAddTaskMutation()
    const [updateTaskMutation, { isLoading: isUpdating }] = useUpdateTaskMutation()
    const [deleteTaskMutation, { isLoading: isDeleting }] = useDeleteTaskMutation()
    const [reorderTasksMutation, { isLoading: isReordering }] = useReorderTasksMutation()

    const addTask = async (task: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => {
        return addTaskMutation(task).unwrap()
    }

    const updateTask = async (id: number, changes: Partial<ITask>) => {
        return updateTaskMutation({ id, changes }).unwrap()
    }

    const deleteTask = async (id: number) => {
        return deleteTaskMutation(id).unwrap()
    }

    const reorderTasks = async (newOrder: ITask[]) => {
        return reorderTasksMutation(newOrder).unwrap()
    }

    const getTaskById = (id: number) => tasks.find((task) => task.id === id)

    return {
        tasks,
        isLoading,
        isError,
        isAdding,
        isUpdating,
        isDeleting,
        isReordering,
        refetch,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
        getTaskById,
    }
}