import type { TaskCategoryType, TaskPriorityType, TaskStatusType } from "@/shared/types/enums"

export interface ITask {
    id: number
    title: string
    description: string
    status: TaskStatusType
    priority: TaskPriorityType
    tags: TaskCategoryType[]
    createdAt: string
    updatedAt?: string
}