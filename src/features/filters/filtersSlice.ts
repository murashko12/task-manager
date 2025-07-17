import type { TaskCategoryType } from "@/shared/types/enums"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IFiltersStore {
    searchTerm: string
    tagFilter: 'all' | TaskCategoryType
}

const initialState: IFiltersStore = {
    searchTerm: '',
    tagFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload
        },
        setTagFilter(state, action: PayloadAction<'all' | TaskCategoryType>) {
            state.tagFilter = action.payload
        }
    }
})

export const { setSearchTerm, setTagFilter } = filtersSlice.actions
export default filtersSlice.reducer