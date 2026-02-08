import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { useActivities } from '@/hooks/useActivities'
import { useAuth } from '@/hooks/useAuth'
import {
  selectShowActivityModal,
  selectCurrentView,
  selectNotification,
  selectIsGuest,
} from '@/redux/selectors'
import {
  setShowActivityModal,
  setCurrentView,
  hideNotification,
} from '@/redux/slices/uiSlice'
import Calendar from '@/components/Calendar/Calendar'
import ActivityForm from '@/components/ActivityForm/ActivityForm'
import TaskSidebar from '@/components/TaskSidebar/TaskSidebar'
import Notification from '@/components/shared/Notification'
import Button from '@/components/shared/Button'
import Header from '@/components/Header/Header'
import { Plus } from 'lucide-react'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { activities, loading } = useActivities()
  const { logout } = useAuth()
  const showActivityModal = useAppSelector(selectShowActivityModal)
  const currentView = useAppSelector(selectCurrentView)
  const notification = useAppSelector(selectNotification)
  const isGuest = useAppSelector(selectIsGuest)

  const handleCreateActivity = () => {
    dispatch(setShowActivityModal(true))
  }

  const handleChangeView = (view: 'month' | 'week' | 'day') => {
    dispatch(setCurrentView(view))
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header onLogout={logout} isGuest={isGuest} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex gap-4 p-4">
          {/* Sidebar */}
          <aside className="w-64 flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleCreateActivity}
                className="flex-1 flex items-center justify-center gap-2"
                aria-label="Create new activity"
              >
                <Plus size={20} />
                New Activity
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">View</h3>
              <div className="flex gap-2 flex-wrap">
                {(['month', 'week', 'day'] as const).map((view) => (
                  <Button
                    key={view}
                    variant={currentView === view ? 'primary' : 'secondary'}
                    onClick={() => handleChangeView(view)}
                    className="flex-1 text-sm capitalize"
                  >
                    {view}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <TaskSidebar activities={activities} loading={loading} />
            </div>
          </aside>

          {/* Calendar */}
          <main className="flex-1 min-h-0">
            <Calendar activities={activities} loading={loading} />
          </main>
        </div>
      </div>

      {/* Modals and Notifications */}
      {showActivityModal && <ActivityForm onClose={() => dispatch(setShowActivityModal(false))} />}

      {notification.show && (
        <div className="fixed top-4 right-4 z-40">
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => dispatch(hideNotification())}
          />
        </div>
      )}
    </div>
  )
}
