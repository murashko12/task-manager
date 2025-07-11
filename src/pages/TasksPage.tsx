import { useMemo } from "react";
import TaskItem from "../components/TaskItem"
import TaskList from "../components/TaskList"
import { TaskCategory, TaskPriority, TaskStatus } from "../types/enums"
import type { ITask } from "../types/Task"

const tasks: ITask[] = [
  {
    id: 1,
    title: "Исправить баг в авторизации",
    description: "Пользователи не могут войти после обновления пароля",
    status: TaskStatus.TO_DO,
    priority: TaskPriority.HIGH,
    tags: [TaskCategory.BUG]
  },
  {
    id: 2,
    title: "Добавить страницу профиля",
    description: "Создать UI для отображения профиля пользователя",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    tags: [TaskCategory.FEATURE, TaskCategory.DOCUMENTATION]
  },
  {
    id: 3,
    title: "Оптимизировать загрузку данных",
    description: "Рефакторинг API запросов для уменьшения времени загрузки",
    status: TaskStatus.DONE,
    priority: TaskPriority.LOW,
    tags: [TaskCategory.REFACTOR]
  },
  {
    id: 4,
    title: "Написать тесты для корзины",
    description: "Покрыть тестами функционал добавления товаров в корзину",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    tags: [TaskCategory.TEST]
  },
  {
    id: 5,
    title: "Обновить документацию API",
    description: "Добавить новые endpoint в Swagger",
    status: TaskStatus.TO_DO,
    priority: TaskPriority.LOW,
    tags: [TaskCategory.DOCUMENTATION]
  }
]

const TasksPage = () => {
    const tasksByStatus = useMemo(() => {
        return {
            [TaskStatus.TO_DO]: tasks.filter((task) => task.status === TaskStatus.TO_DO),
            [TaskStatus.IN_PROGRESS]: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
            [TaskStatus.DONE]: tasks.filter((task) => task.status === TaskStatus.DONE),
        }
    }, [tasks])
    return (
        <div className="w-full h-screen bg-gray-400 p-5 flex gap-5">
            <TaskList status={TaskStatus.TO_DO}>
                {tasksByStatus[TaskStatus.TO_DO].map((task) => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </TaskList>
            <TaskList status={TaskStatus.IN_PROGRESS}>
                {tasksByStatus[TaskStatus.IN_PROGRESS].map((task) => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </TaskList>
            <TaskList status={TaskStatus.DONE}>
                {tasksByStatus[TaskStatus.DONE].map((task) => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </TaskList>
        </div>
    )
}

export default TasksPage
