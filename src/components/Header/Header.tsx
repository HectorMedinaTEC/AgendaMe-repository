import React from 'react'
import { LogOut, User } from 'lucide-react'
import Button from '@/components/shared/Button'

interface HeaderProps {
  onLogout: () => Promise<void>
  isGuest: boolean
}

export default function Header({ onLogout, isGuest }: HeaderProps) {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await onLogout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AgendaMe</h1>
          <p className="text-sm text-gray-600">
            {isGuest ? 'Guest Mode' : 'Organize your activities'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {isGuest && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
              <User size={14} />
              Guest
            </span>
          )}

          <Button
            variant="ghost"
            onClick={handleLogout}
            isLoading={isLoggingOut}
            className="flex items-center gap-2"
            aria-label="Logout"
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
