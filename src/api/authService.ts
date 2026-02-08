import { apiClient } from './apiClient'
import { AuthResponse, GuestSession, User } from '@/types'

export const authService = {
  async guestLogin(): Promise<GuestSession> {
    return apiClient.post('/auth/guest-login')
  },

  async register(email: string, password: string): Promise<AuthResponse> {
    return apiClient.post('/auth/register', { email, password })
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    return apiClient.post('/auth/login', { email, password })
  },

  async logout(): Promise<void> {
    return apiClient.post('/auth/logout')
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get('/auth/me')
  },
}
