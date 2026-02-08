import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActivitiesState, Activity } from '@/types'

const initialState: ActivitiesState = {
  items: [],
  loading: false,
  error: null,
  selectedActivityId: null,
}

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.items.push(action.payload)
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      const index = state.items.findIndex(a => a.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(a => a.id !== action.payload)
    },
    setSelectedActivity: (state, action: PayloadAction<string | null>) => {
      state.selectedActivityId = action.payload
    },
    clearActivities: (state) => {
      state.items = []
      state.selectedActivityId = null
    },
  },
})

export const {
  setLoading,
  setError,
  setActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  setSelectedActivity,
  clearActivities,
} = activitiesSlice.actions

export default activitiesSlice.reducer
