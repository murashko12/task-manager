import { configureStore } from '@reduxjs/toolkit'
import { tasksApi } from '@/app/services/tasksApi'
import filtersReducer from '@/features/filters/filtersSlice'

export const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
        filters: filtersReducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(tasksApi.middleware)
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch