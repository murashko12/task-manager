import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { ITask } from "../types/task"

interface TasksContextType {
    tasks: ITask[]
    addTask: (task: Omit<ITask, "id">) => void
    updateTask: (id: number, updatedTask: Partial<ITask>) => void
    getTaskById: (id: number) => ITask | undefined
    reorderTasks: (newOrder: ITask[]) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<ITask[]>(() => {
        try {
            const saved = localStorage.getItem('tasks')
            return saved ? JSON.parse(saved) : []
        } catch (e) {
            console.error("Ошибка при чтении из localStorage", e)
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (task: Omit<ITask, "id">) => {
        const newTask: ITask = {
            ...task,
            id: Date.now()
        }
        setTasks(prev => [...prev, newTask])
    }

    const updateTask = (id: number, updatedData: Partial<ITask>) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, ...updatedData } : task
            )
        )
    }

    const getTaskById = (id: number) => {
        return tasks.find(task => task.id === id)
    }

    const reorderTasks = (newOrder: ITask[]) => {
        setTasks(newOrder)
        localStorage.setItem('tasks', JSON.stringify(newOrder))
    }

    return (
        <TasksContext.Provider value={{ tasks, addTask, updateTask, getTaskById, reorderTasks }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider")
    }
    return context
}