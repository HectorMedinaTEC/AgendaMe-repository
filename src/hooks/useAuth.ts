import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux'
import { selectIsAuthenticated, selectIsGuest } from '@/redux/selectors'
import { loginSuccess, guestLoginSuccess, logout, setLoading, setError } from '@/redux/slices/authSlice'
import { authService } from '@/api/authService'

export function useAuth() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isGuest = useAppSelector(selectIsGuest)
  const user = useAppSelector(state => state.auth.user)
  const loading = useAppSelector(state => state.auth.loading)
  const error = useAppSelector(state => state.auth.error)

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true))
      const response = await authService.login(email, password)
      dispatch(loginSuccess(response))
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      dispatch(setError(errorMessage))
      return false
    }
  }

  const register = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true))
      const response = await authService.register(email, password)
      dispatch(loginSuccess(response))
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      dispatch(setError(errorMessage))
      return false
    }
  }

  const loginAsGuest = async () => {
    try {
      dispatch(setLoading(true))
      const response = await authService.guestLogin()
      dispatch(guestLoginSuccess(response.token))
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Guest login failed'
      dispatch(setError(errorMessage))
      return false
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      dispatch(logout())
    }
  }

  return {
    isAuthenticated,
    isGuest,
    user,
    loading,
    error,
    login,
    register,
    loginAsGuest,
    logout: handleLogout,
  }
}
