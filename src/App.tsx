import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { restoreSession } from '@/redux/slices/authSlice'
import { selectIsAuthenticated } from '@/redux/selectors'
import Dashboard from '@/pages/Dashboard'
import LoginPage from '@/pages/LoginPage'
import '@/styles/globals.css'

function App() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </div>
  )
}

export default App
