import { apiClient } from './apiClient'
import { Activity } from '@/types'

export const activityService = {
  async getActivities(date?: string): Promise<Activity[]> {
    const params = date ? `?date=${date}` : ''
    return apiClient.get(`/activities${params}`)
  },

  async getActivity(id: string): Promise<Activity> {
    return apiClient.get(`/activities/${id}`)
  },

  async createActivity(activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>): Promise<Activity> {
    return apiClient.post('/activities', activity)
  },

  async updateActivity(id: string, activity: Partial<Activity>): Promise<Activity> {
    return apiClient.put(`/activities/${id}`, activity)
  },

  async deleteActivity(id: string): Promise<void> {
    return apiClient.delete(`/activities/${id}`)
  },

  async getActivitiesByDateRange(startDate: string, endDate: string): Promise<Activity[]> {
    return apiClient.get(`/activities?start_date=${startDate}&end_date=${endDate}`)
  },
}
