import { createContext, useContext, useState, useEffect } from "react"
import type { ITask } from "../types/Task"

interface TasksContextType {
    tasks: ITask[]
    addTask: (task: Omit<ITask, "id">) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

const initialTasks: ITask[] = []

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {

    const [tasks, setTasks] = useState<ITask[]>(() => {
        try {
            const saved = localStorage.getItem('tasks')
            return saved ? JSON.parse(saved) : initialTasks
        } catch (e) {
            console.error("Ошибка при чтении из localStorage", e)
            return initialTasks;
        }
    })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        // localStorage.clear()
    }, [tasks])

    const addTask = (task: Omit<ITask, "id">) => {
            const newTask: ITask = {
            ...task,
            id: Date.now()
        }
        setTasks((prevTasks) => [...prevTasks, newTask])
    }

    return (
        <TasksContext.Provider value={{ tasks, addTask }}>
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