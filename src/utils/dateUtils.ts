import { format, parse, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns'

export function formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  const dateObj = typeof date === 'string' ? parse(date, 'yyyy-MM-dd', new Date()) : date
  return format(dateObj, formatStr)
}

export function getMonthDays(year: number, month: number) {
  const start = startOfMonth(new Date(year, month, 1))
  const end = endOfMonth(start)
  return eachDayOfInterval({ start, end })
}

export function getWeekDays(date: Date | string) {
  const dateObj = typeof date === 'string' ? parse(date, 'yyyy-MM-dd', new Date()) : date
  const start = startOfWeek(dateObj)
  const end = endOfWeek(dateObj)
  return eachDayOfInterval({ start, end })
}

export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parse(date, 'yyyy-MM-dd', new Date()) : date
  const today = new Date()
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? parse(date1, 'yyyy-MM-dd', new Date()) : date1
  const d2 = typeof date2 === 'string' ? parse(date2, 'yyyy-MM-dd', new Date()) : date2
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}

export function getTimeInMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + minutes
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

export function calculateDuration(startTime: string, endTime: string): number {
  const start = getTimeInMinutes(startTime)
  const end = getTimeInMinutes(endTime)
  return end > start ? end - start : 0
}
