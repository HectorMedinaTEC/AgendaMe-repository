import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import activitiesReducer from './slices/activitiesSlice'
import timeBlocksReducer from './slices/timeBlocksSlice'
import prioritiesReducer from './slices/prioritiesSlice'
import recurringEventsReducer from './slices/recurringEventsSlice'
import completionHistoryReducer from './slices/completionHistorySlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activitiesReducer,
    timeBlocks: timeBlocksReducer,
    priorities: prioritiesReducer,
    recurringEvents: recurringEventsReducer,
    completionHistory: completionHistoryReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
