import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User } from '@/types'

const initialState: AuthState = {
  isAuthenticated: false,
  isGuest: false,
  user: null,
  token: localStorage.getItem('authToken'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true
      state.isGuest = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
      state.error = null
      localStorage.setItem('authToken', action.payload.token)
    },
    guestLoginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.isGuest = true
      state.user = null
      state.token = action.payload
      state.loading = false
      state.error = null
      localStorage.setItem('guestToken', action.payload)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.isGuest = false
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('guestToken')
    },
    restoreSession: (state) => {
      const token = localStorage.getItem('authToken') || localStorage.getItem('guestToken')
      if (token) {
        state.token = token
        state.isAuthenticated = true
        state.isGuest = !!localStorage.getItem('guestToken')
      }
    },
  },
})

export const {
  setLoading,
  setError,
  loginSuccess,
  guestLoginSuccess,
  logout,
  restoreSession,
} = authSlice.actions

export default authSlice.reducer
