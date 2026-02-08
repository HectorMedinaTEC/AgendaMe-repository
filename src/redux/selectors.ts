import { RootState } from './store'
import { Activity, TimeBlock, Priority, RecurringEvent } from '@/types'

// Auth selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectIsGuest = (state: RootState) => state.auth.isGuest
export const selectUser = (state: RootState) => state.auth.user
export const selectAuthToken = (state: RootState) => state.auth.token
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthError = (state: RootState) => state.auth.error

// Activities selectors
export const selectAllActivities = (state: RootState) => state.activities.items
export const selectActivitiesLoading = (state: RootState) => state.activities.loading
export const selectActivitiesError = (state: RootState) => state.activities.error
export const selectSelectedActivityId = (state: RootState) => state.activities.selectedActivityId
export const selectActivityById = (state: RootState, id: string) =>
  state.activities.items.find(a => a.id === id)
export const selectActivitiesByDate = (state: RootState, date: string) =>
  state.activities.items.filter(a => a.date === date)

// TimeBlocks selectors
export const selectAllTimeBlocks = (state: RootState) => state.timeBlocks.items
export const selectTimeBlocksByActivity = (state: RootState, activityId: string) =>
  state.timeBlocks.items.filter(tb => tb.activity_id === activityId)

// Priorities selectors
export const selectAllPriorities = (state: RootState) => state.priorities.items
export const selectPriorityByActivity = (state: RootState, activityId: string) =>
  state.priorities.items.find(p => p.activity_id === activityId)

// Recurring Events selectors
export const selectAllRecurringEvents = (state: RootState) => state.recurringEvents.items

// Completion History selectors
export const selectAllCompletionHistory = (state: RootState) => state.completionHistory.items

// UI selectors
export const selectShowActivityModal = (state: RootState) => state.ui.showActivityModal
export const selectShowTimeBlockModal = (state: RootState) => state.ui.showTimeBlockModal
export const selectShowDeleteConfirm = (state: RootState) => state.ui.showDeleteConfirm
export const selectShowSettingsModal = (state: RootState) => state.ui.showSettingsModal
export const selectCurrentView = (state: RootState) => state.ui.currentView
export const selectSelectedDate = (state: RootState) => state.ui.selectedDate
export const selectNotification = (state: RootState) => state.ui.notification
