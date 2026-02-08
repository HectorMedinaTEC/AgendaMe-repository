export type ActivityStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled'
export type ActivityPriority = 'low' | 'medium' | 'high'

export interface Activity {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  status: ActivityStatus
  priority?: ActivityPriority
  createdAt?: string
  updatedAt?: string
}
