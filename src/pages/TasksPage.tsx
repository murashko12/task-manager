import TaskItem from "../components/TaskItem"
import TaskList from "../components/TaskList"
import { TaskStatus } from "../types/enums"

const TasksPage = () => {
    return (
        <div className="w-full h-screen bg-gray-400 p-5 flex gap-5">
            <TaskList status={TaskStatus.TO_DO}>
                <TaskItem />
            </TaskList>
            <TaskList status={TaskStatus.IN_PROGRESS}>
                <p>asdasd</p>
            </TaskList>
            <TaskList status={TaskStatus.DONE}>
                <p>asdasd</p>
            </TaskList>
        </div>
    )
}

export default TasksPage
