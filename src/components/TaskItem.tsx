import { Link } from "react-router-dom"
import type { ITask } from "../types/task"

type TaskItemProps = Pick<ITask, 'id' | 'title' | 'priority' | 'tags'>

const TaskItem = ({ id, title, priority, tags }: TaskItemProps) => {

    return (
        <div className="w-full h-full border-2 rounded-lg p-2">
            <h3 className="font-bold">{title}</h3>
            <p>Priority: {priority}</p>
            <div className="flex gap-1 mt-2">
                {tags.map(tag => (
                    <span 
                        key={tag} 
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <Link to={`/task/${id}`}>
                <button className="border-2 rounded-lg p-2 cursor-pointer">Edit</button>
            </Link>
        </div>
    )
}

export default TaskItem
