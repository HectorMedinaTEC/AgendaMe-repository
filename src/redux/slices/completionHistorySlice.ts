import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompletionHistoryState, CompletionHistory } from '@/types'

const initialState: CompletionHistoryState = {
  items: [],
  loading: false,
  error: null,
}

const completionHistorySlice = createSlice({
  name: 'completionHistory',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setCompletionHistory: (state, action: PayloadAction<CompletionHistory[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addCompletion: (state, action: PayloadAction<CompletionHistory>) => {
      state.items.push(action.payload)
    },
    clearCompletionHistory: (state) => {
      state.items = []
    },
  },
})

export const {
  setLoading,
  setError,
  setCompletionHistory,
  addCompletion,
  clearCompletionHistory,
} = completionHistorySlice.actions

export default completionHistorySlice.reducer
