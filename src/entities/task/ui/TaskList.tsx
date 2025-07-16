import { type ReactNode } from "react"
import { type TaskStatusType } from "@/shared/types/enums"
import { useDroppable } from "@dnd-kit/core"
import { statusTitles } from "@/entities/task/constants"

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

export default TaskList