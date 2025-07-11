export const TaskStatus = {
    TO_DO : "TO_DO",
    IN_PROGRESS : "IN_PROGRESS",
    DONE : "DONE"
} as const

export const TaskPriority = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
} as const

export const TaskCategory = {
    BUG: "BUG",
    FEATURE: "FEATURE",
    DOCUMENTATION: "DOCUMENTATION",
    REFACTOR: "REFACTOR",
    TEST: "TEST"
} as const

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus]
export type TaskPriorityType = typeof TaskPriority[keyof typeof TaskPriority]
export type TaskCategoryType = typeof TaskCategory[keyof typeof TaskCategory]