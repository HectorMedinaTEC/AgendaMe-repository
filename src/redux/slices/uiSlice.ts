import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UIState } from '@/types'

const initialState: UIState = {
  selectedDate: null,
  viewMode: 'month',
  showActivityModal: false,
  showTimeBlockModal: false,
  showDeleteConfirm: false,
  showSettingsModal: false,
  editingActivityId: null,
  filterStatus: [],
  searchQuery: '',
  sidebarOpen: true,
  activityToDelete: null,
  currentView: 'month',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedDate: (state: UIState, action: PayloadAction<string>) => {
      state.selectedDate = action.payload
    },
    setViewMode: (state: UIState, action: PayloadAction<'month' | 'week' | 'day'>) => {
      state.viewMode = action.payload
    },
    setShowActivityModal: (state: UIState, action: PayloadAction<boolean>) => {
      state.showActivityModal = action.payload
    },
    toggleTimeBlockModal: (state: UIState) => {
      state.showTimeBlockModal = !state.showTimeBlockModal
    },
    setShowTimeBlockModal: (state: UIState, action: PayloadAction<boolean>) => {
      state.showTimeBlockModal = action.payload
    },
    toggleDeleteConfirm: (state: UIState) => {
      state.showDeleteConfirm = !state.showDeleteConfirm
    },
    setShowDeleteConfirm: (state: UIState, action: PayloadAction<boolean>) => {
      state.showDeleteConfirm = action.payload
    },
    toggleSettingsModal: (state: UIState) => {
      state.showSettingsModal = !state.showSettingsModal
    },
    setShowSettingsModal: (state: UIState, action: PayloadAction<boolean>) => {
      state.showSettingsModal = action.payload
    },
    setCurrentView: (state: UIState, action: PayloadAction<'month' | 'week' | 'day'>) => {
      state.currentView = action.payload
    },
    setEditingActivity: (state: UIState, action: PayloadAction<string | null>) => {
      state.editingActivityId = action.payload
    },
    setFilterStatus: (state: UIState, action: PayloadAction<string[]>) => {
      state.filterStatus = action.payload
    },
    setSearchQuery: (state: UIState, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    toggleSidebar: (state: UIState) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state: UIState, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setActivityToDelete: (state: UIState, action: PayloadAction<string | null>) => {
      state.activityToDelete = action.payload
    },
    showNotification: (state: UIState, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      // Handle notification display logic here if needed
      console.log(action.payload)
    },
    hideNotification: (state: UIState) => {
      // Clear notification state if you have a notification field
    },
  },
})

export default uiSlice.reducer
export const {
  setSelectedDate,
  setViewMode,
  setShowActivityModal,
  toggleTimeBlockModal,
  setShowTimeBlockModal,
  toggleDeleteConfirm,
  setShowDeleteConfirm,
  toggleSettingsModal,
  setShowSettingsModal,
  setCurrentView,
  setEditingActivity,
  setFilterStatus,
  setSearchQuery,
  toggleSidebar,
  setSidebarOpen,
  setActivityToDelete,
  showNotification,
  hideNotification,
} = uiSlice.actions
