import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ITask } from '@/shared/types/task'

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            queryFn: () => {
                try {
                    const saved = localStorage.getItem('tasks')
                    const data = saved ? JSON.parse(saved) : []
                    return { data }
                } catch (e) {
                    return { error: { status: 500, data: 'Ошибка при чтении задач' } }
                }
            },
            providesTags: ['Tasks']
        }),
        addTask: builder.mutation<ITask, Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>>({
            queryFn: (task) => {
                try {
                    const saved = localStorage.getItem('tasks')
                    const tasks = saved ? JSON.parse(saved) : []
                    const now = new Date().toISOString()
                    const newTask = {
                        ...task,
                        id: Date.now(),
                        createdAt: now,
                        updatedAt: now
                    }
                    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
                    return { data: newTask }
                } catch (e) {
                    return { error: { status: 500, data: 'Ошибка при добавлении задачи' } }
                }
            },
            invalidatesTags: ['Tasks']
        }),
        updateTask: builder.mutation<ITask, { id: number; changes: Partial<ITask> }>({
            queryFn: ({ id, changes }) => {
                try {
                    const saved = localStorage.getItem('tasks')
                    const tasks = saved ? JSON.parse(saved) : []
                    const updatedTasks = tasks.map((task: ITask) =>
                        task.id === id
                            ? { ...task, ...changes, updatedAt: new Date().toISOString() }
                            : task
                    )
                    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
                    const updatedTask = updatedTasks.find((task: ITask) => task.id === id)
                    return { data: updatedTask }
                } catch (e) {
                    return { error: { status: 500, data: 'Ошибка при обновлении задачи' } }
                }
            },
            invalidatesTags: ['Tasks']
        }),
        deleteTask: builder.mutation<void, number>({
            queryFn: (id) => {
                try {
                    const saved = localStorage.getItem('tasks')
                    const tasks = saved ? JSON.parse(saved) : []
                    const filteredTasks = tasks.filter((task: ITask) => task.id !== id)
                    localStorage.setItem('tasks', JSON.stringify(filteredTasks))
                    return { data: undefined }
                } catch (e) {
                    return { error: { status: 500, data: 'Ошибка при удалении задачи' } }
                }
            },
            invalidatesTags: ['Tasks']
        }),
        reorderTasks: builder.mutation<void, ITask[]>({
            queryFn: (newOrder) => {
                try {
                    localStorage.setItem('tasks', JSON.stringify(newOrder))
                    return { data: undefined }
                } catch (e) {
                    return { error: { status: 500, data: 'Ошибка при переупорядочивании задач' } }
                }
            },
            invalidatesTags: ['Tasks']
        }),
    })
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useReorderTasksMutation
} = tasksApi
