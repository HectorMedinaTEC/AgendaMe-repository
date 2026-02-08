export const PRIORITY_COLORS = {
  1: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', label: 'Low' },
  2: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'Medium' },
  3: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', label: 'High' },
  4: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', label: 'Very High' },
  5: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', label: 'Critical' },
}

export const STATUS_COLORS = {
  'pending': { bg: 'bg-gray-100', text: 'text-gray-800' },
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'completed': { bg: 'bg-green-100', text: 'text-green-800' },
  'cancelled': { bg: 'bg-red-100', text: 'text-red-800' },
}

export const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, '0') + ':00'
)

export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
