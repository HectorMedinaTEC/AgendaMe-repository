import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TimeBlocksState, TimeBlock } from '@/types'

const initialState: TimeBlocksState = {
  items: [],
  loading: false,
  error: null,
}

const timeBlocksSlice = createSlice({
  name: 'timeBlocks',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setTimeBlocks: (state, action: PayloadAction<TimeBlock[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addTimeBlock: (state, action: PayloadAction<TimeBlock>) => {
      state.items.push(action.payload)
    },
    updateTimeBlock: (state, action: PayloadAction<TimeBlock>) => {
      const index = state.items.findIndex(tb => tb.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteTimeBlock: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(tb => tb.id !== action.payload)
    },
    clearTimeBlocks: (state) => {
      state.items = []
    },
  },
})

export const {
  setLoading,
  setError,
  setTimeBlocks,
  addTimeBlock,
  updateTimeBlock,
  deleteTimeBlock,
  clearTimeBlocks,
} = timeBlocksSlice.actions

export default timeBlocksSlice.reducer
