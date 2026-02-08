import { apiClient } from './apiClient'
import { RecurringEvent } from '@/types'

export const recurringEventService = {
  async getRecurringEvents(): Promise<RecurringEvent[]> {
    return apiClient.get('/recurring-events')
  },

  async getRecurringEvent(id: string): Promise<RecurringEvent> {
    return apiClient.get(`/recurring-events/${id}`)
  },

  async createRecurringEvent(event: Omit<RecurringEvent, 'id'>): Promise<RecurringEvent> {
    return apiClient.post('/recurring-events', event)
  },

  async updateRecurringEvent(id: string, event: Partial<RecurringEvent>): Promise<RecurringEvent> {
    return apiClient.put(`/recurring-events/${id}`, event)
  },

  async deleteRecurringEvent(id: string): Promise<void> {
    return apiClient.delete(`/recurring-events/${id}`)
  },
}
