import { useParams } from "react-router-dom"

const TaskIdPage = () => {
    const { id } = useParams<{ id: string }>()
    return (
        <div>
            TaskIdPage {id}
        </div>
  )
}

export default TaskIdPage
