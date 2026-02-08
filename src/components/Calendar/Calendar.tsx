import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { selectSelectedDate } from '@/redux/selectors'
import { setSelectedDate } from '@/redux/slices/uiSlice'
import { getMonthDays, formatDate, isToday, isSameDay } from '@/utils/dateUtils'
import { DAYS_OF_WEEK, MONTHS } from '@/utils/constants'
import { Activity } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  activities: Activity[]
  loading: boolean
}

export default function Calendar({ activities, loading }: CalendarProps) {
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector(selectSelectedDate)
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const monthDays = useMemo(() => getMonthDays(currentMonth.getFullYear(), currentMonth.getMonth()), [currentMonth])

  const activitiesByDate = useMemo(() => {
    const map: { [key: string]: Activity[] } = {}
    activities.forEach((activity) => {
      if (!map[activity.date]) {
        map[activity.date] = []
      }
      map[activity.date].push(activity)
    })
    return map
  }, [activities])

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleSelectDate = (date: Date) => {
    dispatch(setSelectedDate(formatDate(date)))
  }

  const firstDayOfWeek = monthDays[0]?.getDay() || 0
  const weeksInMonth = Math.ceil((monthDays.length + firstDayOfWeek) / 7)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            className="btn-ghost p-2"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="btn-ghost p-2"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        ) : (
          <div className="p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {monthDays.map((date) => {
                const dateStr = formatDate(date)
                const dayActivities = activitiesByDate[dateStr] || []
                const isSelected = isSameDay(date, selectedDate)
                const isTodayDate = isToday(date)

                return (
                  <button
                    key={dateStr}
                    onClick={() => handleSelectDate(date)}
                    className={`
                      aspect-square p-2 rounded-lg border text-sm font-medium text-left
                      transition-colors relative
                      ${isSelected ? 'bg-primary-100 border-primary-500 text-primary-900' : ''}
                      ${isTodayDate && !isSelected ? 'bg-yellow-50 border-yellow-300' : ''}
                      ${!isSelected && !isTodayDate ? 'hover:bg-gray-50 border-gray-200' : ''}
                      ${!isSelected && !isTodayDate && currentMonth.getMonth() !== date.getMonth() ? 'opacity-50' : ''}
                    `}
                    aria-label={`${dateStr} with ${dayActivities.length} activities`}
                    aria-pressed={isSelected}
                  >
                    <div className="font-semibold mb-1">{date.getDate()}</div>
                    {dayActivities.length > 0 && (
                      <div className="text-xs text-gray-600">
                        {dayActivities.length} task{dayActivities.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
