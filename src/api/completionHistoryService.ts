import { apiClient } from './apiClient'
import { CompletionHistory } from '@/types'

export const completionHistoryService = {
  async getCompletionHistory(): Promise<CompletionHistory[]> {
    return apiClient.get('/completion-history')
  },

  async getActivityHistory(activityId: string): Promise<CompletionHistory[]> {
    return apiClient.get(`/completion-history?activity_id=${activityId}`)
  },

  async addCompletion(completion: Omit<CompletionHistory, 'id'>): Promise<CompletionHistory> {
    return apiClient.post('/completion-history', completion)
  },
}
