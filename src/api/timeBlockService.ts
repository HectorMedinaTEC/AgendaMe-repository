import { apiClient } from './apiClient'
import { TimeBlock } from '@/types'

export const timeBlockService = {
  async getTimeBlocks(): Promise<TimeBlock[]> {
    return apiClient.get('/time-blocks')
  },

  async getTimeBlocksByActivity(activityId: string): Promise<TimeBlock[]> {
    return apiClient.get(`/time-blocks?activity_id=${activityId}`)
  },

  async getTimeBlock(id: string): Promise<TimeBlock> {
    return apiClient.get(`/time-blocks/${id}`)
  },

  async createTimeBlock(timeBlock: Omit<TimeBlock, 'id'>): Promise<TimeBlock> {
    return apiClient.post('/time-blocks', timeBlock)
  },

  async updateTimeBlock(id: string, timeBlock: Partial<TimeBlock>): Promise<TimeBlock> {
    return apiClient.put(`/time-blocks/${id}`, timeBlock)
  },

  async deleteTimeBlock(id: string): Promise<void> {
    return apiClient.delete(`/time-blocks/${id}`)
  },
}
