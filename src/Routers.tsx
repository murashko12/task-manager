import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

const Routers = () => {

    const LazyTasksPage = lazy(() => import('../src/pages/TasksPage'))
    const LazyCreateTaskPage = lazy(() => import('../src/pages/CreateTaskPage'))
    const LazyTaskIdPage = lazy(() => import('../src/pages/TaskIdPage'))
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<LazyTasksPage />} /> 
                <Route path="/create_task" element={<LazyCreateTaskPage />} /> 
                <Route path="/task/:id" element={<LazyTaskIdPage />} /> 
            </Routes>
        </Suspense>
    )
}

export default Routers
