import type { ITask } from "../types/Task"



type TaskItemProps = Pick<ITask, 'title' | 'priority' | 'tags'>

const TaskItem = ({ title, priority, tags }: TaskItemProps) => {

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
        </div>
    )
}

export default TaskItem
