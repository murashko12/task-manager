import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

const Routers = () => {

    const LazyTasksPage = lazy(() => import('../src/pages/TasksPage'))
    const LazyCreateTaskPage = lazy(() => import('../src/pages/CreateTaskPage'))
    const LazyTaskIdPage = lazy(() => import('../src/pages/TaskIdPage'))
    const LazyTaskIdEditPage = lazy(() => import('../src/pages/TaskIdEditPage'))

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<LazyTasksPage />} /> 
                <Route path="/create_task" element={<LazyCreateTaskPage />} /> 
                <Route path="/task/:id" element={<LazyTaskIdPage />} /> 
                <Route path="/task/:id/edit" element={<LazyTaskIdEditPage />} />
            </Routes>
        </Suspense>
    )
}

export default Routers
