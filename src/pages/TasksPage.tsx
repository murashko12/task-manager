import { useMemo } from "react";
import TaskItem from "../components/TaskItem"
import TaskList from "../components/TaskList"
import { TaskStatus } from "../types/enums"
import { useTasks } from "../context/TasksContext"
import { Link } from "react-router-dom";

const TasksPage = () => {

    const {tasks} = useTasks()

    const tasksByStatus = useMemo(() => {
        return {
            [TaskStatus.TO_DO]: tasks.filter((task) => task.status === TaskStatus.TO_DO),
            [TaskStatus.IN_PROGRESS]: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
            [TaskStatus.DONE]: tasks.filter((task) => task.status === TaskStatus.DONE)
        }
    }, [tasks])

    return (
        <div className="w-full h-screen bg-gray-400 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <input type="text" className="border-2 rounded-lg p-2 outline-none" />
                <Link to="/create_task">
                    <button className="border-2 rounded-lg p-2 cursor-pointer">Add task</button>
                </Link>
            </div>
            <div className="flex gap-5 h-full">
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
        </div>
    )
}

export default TasksPage
