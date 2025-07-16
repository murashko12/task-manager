import {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useReorderTasksMutation,
} from '@/app/services/tasksApi'
import type { ITask } from '@/shared/types/task'

export const useTasks = () => {
    const { 
        data: tasks = [], 
        isLoading, 
        isError, 
        isFetching,
        refetch 
    } = useGetTasksQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    
    const [addTaskMutation] = useAddTaskMutation()
    const [updateTaskMutation] = useUpdateTaskMutation()
    const [deleteTaskMutation] = useDeleteTaskMutation()
    const [reorderTasksMutation] = useReorderTasksMutation()

    const addTask = async (task: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await addTaskMutation(task).unwrap()
        } catch (e) {
            console.error('Error adding task:', e)
        }
    }

    const updateTask = async (id: number, changes: Partial<ITask>) => {
        try {
            await updateTaskMutation({ id, changes }).unwrap()
        } catch (e) {
            console.error('Error updating task:', e)
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await deleteTaskMutation(id).unwrap()
        } catch (e) {
            console.error('Error deleting task:', e)
        }
    }

    const reorderTasks = async (newOrder: ITask[]) => {
        try {
            await reorderTasksMutation(newOrder).unwrap()
        } catch (e) {
            console.error('Error reordering tasks:', e)
        }
    }

    const getTaskById = (id: number) => tasks.find((task) => task.id === id)

    return {
        tasks,
        isLoading,
        isError,
        isFetching,
        refetch,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
        getTaskById,
    }
}