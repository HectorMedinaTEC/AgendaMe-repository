import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PrioritiesState, Priority } from '@/types'

const initialState: PrioritiesState = {
  items: [],
  loading: false,
  error: null,
}

const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setPriorities: (state, action: PayloadAction<Priority[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addPriority: (state, action: PayloadAction<Priority>) => {
      state.items.push(action.payload)
    },
    updatePriority: (state, action: PayloadAction<Priority>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deletePriority: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(p => p.id !== action.payload)
    },
    clearPriorities: (state) => {
      state.items = []
    },
  },
})

export const {
  setLoading,
  setError,
  setPriorities,
  addPriority,
  updatePriority,
  deletePriority,
  clearPriorities,
} = prioritiesSlice.actions

export default prioritiesSlice.reducer
