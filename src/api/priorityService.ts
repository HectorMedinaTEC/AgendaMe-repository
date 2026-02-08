import { apiClient } from './apiClient'
import { Priority } from '@/types'

export const priorityService = {
  async getPriorities(): Promise<Priority[]> {
    return apiClient.get('/priorities')
  },

  async getPriority(id: string): Promise<Priority> {
    return apiClient.get(`/priorities/${id}`)
  },

  async getPriorityByActivity(activityId: string): Promise<Priority | null> {
    try {
      return await apiClient.get(`/priorities?activity_id=${activityId}`)
    } catch {
      return null
    }
  },

  async createPriority(priority: Omit<Priority, 'id'>): Promise<Priority> {
    return apiClient.post('/priorities', priority)
  },

  async updatePriority(id: string, priority: Partial<Priority>): Promise<Priority> {
    return apiClient.put(`/priorities/${id}`, priority)
  },

  async deletePriority(id: string): Promise<void> {
    return apiClient.delete(`/priorities/${id}`)
  },
}
