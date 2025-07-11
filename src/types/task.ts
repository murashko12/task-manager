import type { TaskCategoryType, TaskPriorityType, TaskStatusType } from "./enums"

export interface ITask {
    id: number
    title: string
    description: string
    status: TaskStatusType
    priority: TaskPriorityType
    tags: TaskCategoryType[]
}