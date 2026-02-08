import React from 'react'
import { useAppDispatch } from '@/hooks/useRedux'
import { setSelectedDate } from '@/redux/slices/uiSlice'
import { Activity } from '@/types'
import { formatDate } from '@/utils/dateUtils'
import { STATUS_COLORS } from '@/utils/constants'
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react'

interface TaskSidebarProps {
  activities: Activity[]
  loading: boolean
}

export default function TaskSidebar({ activities, loading }: TaskSidebarProps) {
  const dispatch = useAppDispatch()
  const [expandedDate, setExpandedDate] = React.useState<string | null>(null)

  const upcomingActivities = React.useMemo(() => {
    const today = new Date()
    return activities
      .filter((a) => new Date(a.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10)
  }, [activities])

  const groupedByDate = React.useMemo(() => {
    const groups: { [key: string]: Activity[] } = {}
    upcomingActivities.forEach((activity) => {
      if (!groups[activity.date]) {
        groups[activity.date] = []
      }
      groups[activity.date].push(activity)
    })
    return groups
  }, [upcomingActivities])

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} className="text-green-600" />
      case 'in-progress':
        return <AlertCircle size={16} className="text-blue-600" />
      default:
        return <Circle size={16} className="text-gray-400" />
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Upcoming Tasks</h3>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600" />
          </div>
        ) : Object.keys(groupedByDate).length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No upcoming activities</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {Object.entries(groupedByDate).map(([date, dateActivities]) => (
              <div key={date}>
                <button
                  onClick={() => {
                    dispatch(setSelectedDate(date))
                    setExpandedDate(expandedDate === date ? null : date)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  aria-expanded={expandedDate === date}
                >
                  <span className="font-medium text-gray-900 text-sm">
                    {formatDate(date, 'MMM d, yyyy')}
                  </span>
                  <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
                    {dateActivities.length}
                  </span>
                </button>

                {expandedDate === date && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    {dateActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`px-4 py-3 text-sm border-l-2 ${
                          STATUS_COLORS[activity.status as keyof typeof STATUS_COLORS]?.bg || 'bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {getStatusIcon(activity.status)}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {activity.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {activity.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
