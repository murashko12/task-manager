import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { TasksProvider } from './context/TasksContext.tsx'

createRoot(document.getElementById('root')!).render(
  <TasksProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TasksProvider>
)
