import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RecurringEventsState, RecurringEvent } from '@/types'

const initialState: RecurringEventsState = {
  items: [],
  loading: false,
  error: null,
}

const recurringEventsSlice = createSlice({
  name: 'recurringEvents',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setRecurringEvents: (state, action: PayloadAction<RecurringEvent[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addRecurringEvent: (state, action: PayloadAction<RecurringEvent>) => {
      state.items.push(action.payload)
    },
    updateRecurringEvent: (state, action: PayloadAction<RecurringEvent>) => {
      const index = state.items.findIndex(re => re.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteRecurringEvent: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(re => re.id !== action.payload)
    },
    clearRecurringEvents: (state) => {
      state.items = []
    },
  },
})

export const {
  setLoading,
  setError,
  setRecurringEvents,
  addRecurringEvent,
  updateRecurringEvent,
  deleteRecurringEvent,
  clearRecurringEvents,
} = recurringEventsSlice.actions

export default recurringEventsSlice.reducer
