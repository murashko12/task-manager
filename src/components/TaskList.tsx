import type { ReactNode } from "react"
import { TaskStatus, type TaskStatusType } from "../types/enums"

interface IProps {
    status: TaskStatusType
    children: ReactNode
}

const TaskList = ({status, children}: IProps) => {

    const statusMap: Record<TaskStatusType, ReactNode> = {
        [TaskStatus.TO_DO]: <p>To Do</p>,
        [TaskStatus.IN_PROGRESS]: <p>In Progress</p>,
        [TaskStatus.DONE]: <p>Done</p>,
    }

    return (
        <div className="w-full h-full border-2 rounded-lg p-2">
            <p className="uppercase text-center">{statusMap[status]}</p>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    )
}

export default TaskList
