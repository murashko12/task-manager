import { type ReactNode } from "react"
import { TaskStatus, type TaskStatusType } from "@/types/enums"
import { useDroppable } from "@dnd-kit/core"

interface IProps {
  status: TaskStatusType
  children: ReactNode
}

const TaskList = ({ status, children }: IProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      status
    }
  })

  const statusTitles = {
    [TaskStatus.TO_DO]: "К выполнению",
    [TaskStatus.IN_PROGRESS]: "В работе",
    [TaskStatus.DONE]: "Выполнено"
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 border rounded-lg p-3 flex flex-col ${
        isOver ? "bg-gray-200" : "bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold mb-3">{statusTitles[status]}</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {children}
      </div>
    </div>
  )
}

export default TaskList;