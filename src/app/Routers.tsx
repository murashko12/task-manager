import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

const Routers = () => {

    const LazyTasksPage = lazy(() => import('@/pages/TasksPage/TasksPage'))
    const LazyTaskNewPage = lazy(() => import('@/pages/TaskNewPage/TaskNewPage'))
    const LazyTaskIdPage = lazy(() => import('@/pages/TaskIdPage/TaskIdPage'))
    const LazyTaskIdEditPage = lazy(() => import('@/pages/TaskIdEditPage/TaskIdEditPage'))

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<LazyTasksPage />} /> 
                <Route path="/task/new" element={<LazyTaskNewPage />} /> 
                <Route path="/task/:id" element={<LazyTaskIdPage />} /> 
                <Route path="/task/:id/edit" element={<LazyTaskIdEditPage />} />
            </Routes>
        </Suspense>
    )
}

export default Routers
