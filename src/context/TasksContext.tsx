import { createContext, useState, type ReactNode } from "react"
import type { ITask } from "../types/Task"
import { useContext } from "react"

interface TasksContextType {
  tasks: ITask[]
  addTask: (task: Omit<ITask, "id">) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<ITask[]>([])

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
        throw new Error("useTasks должен быть использован с TasksProvider")
    }
    return context
}