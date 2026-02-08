import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux'
import { selectAllActivities } from '@/redux/selectors'
import { setActivities, addActivity, updateActivity, deleteActivity, setLoading, setError } from '@/redux/slices/activitiesSlice'
import { activityService } from '@/api/activityService'
import { Activity } from '@/types'

export function useActivities(date?: string) {
  const dispatch = useAppDispatch()
  const activities = useAppSelector(selectAllActivities)
  const loading = useAppSelector(state => state.activities.loading)
  const error = useAppSelector(state => state.activities.error)

  useEffect(() => {
    fetchActivities()
  }, [date])

  const fetchActivities = async () => {
    try {
      dispatch(setLoading(true))
      const data = await activityService.getActivities(date)
      dispatch(setActivities(data))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch activities'
      dispatch(setError(errorMessage))
    }
  }

  const createActivity = async (activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newActivity = await activityService.createActivity(activity)
      dispatch(addActivity(newActivity))
      return newActivity
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create activity'
      dispatch(setError(errorMessage))
      throw err
    }
  }

  const updateActivityData = async (id: string, updates: Partial<Activity>) => {
    try {
      const updated = await activityService.updateActivity(id, updates)
      dispatch(updateActivity(updated))
      return updated
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update activity'
      dispatch(setError(errorMessage))
      throw err
    }
  }

  const deleteActivityData = async (id: string) => {
    try {
      await activityService.deleteActivity(id)
      dispatch(deleteActivity(id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete activity'
      dispatch(setError(errorMessage))
      throw err
    }
  }

  return {
    activities,
    loading,
    error,
    fetchActivities,
    createActivity,
    updateActivity: updateActivityData,
    deleteActivity: deleteActivityData,
  }
}
