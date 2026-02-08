import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { validateEmail, validatePassword } from '@/utils/validators'
import { Calendar } from 'lucide-react'

type AuthMode = 'login' | 'register'

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { login, register, loginAsGuest, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0]
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const success = mode === 'login'
      ? await login(email, password)
      : await register(email, password)

    if (success) {
      setEmail('')
      setPassword('')
      setErrors({})
    }
  }

  const handleGuestLogin = async () => {
    await loginAsGuest()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="text-white" size={32} />
            <h1 className="text-3xl font-bold text-white">AgendaMe</h1>
          </div>
          <p className="text-primary-100">Organize your activities with ease</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors({ ...errors, email: '' })
                }
              }}
              error={errors.email}
              disabled={loading}
              aria-required="true"
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) {
                  setErrors({ ...errors, password: '' })
                }
              }}
              error={errors.password}
              disabled={loading}
              aria-required="true"
            />

            {mode === 'register' && (
              <p className="text-xs text-gray-600">
                Password must be at least 8 characters with one uppercase letter and one number
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full"
          >
            Continue as Guest
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setErrors({})
              }}
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-primary-100 text-xs">
          AgendaMe helps you organize activities and achieve your goals
        </p>
      </div>
    </div>
  )
}
