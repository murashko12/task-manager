import { TaskPriority, TaskStatus } from "@/shared/types/enums"

export const priorityTitles = {
    [TaskPriority.LOW]: 'Низкий',
    [TaskPriority.MEDIUM]: 'Средний',
    [TaskPriority.HIGH]: 'Высокий'
}

export const statusTitles = {
    [TaskStatus.TO_DO]: 'К выполнению',
    [TaskStatus.IN_PROGRESS]: 'В работе',
    [TaskStatus.DONE]: 'Выполнено'
}