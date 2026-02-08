export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateActivityForm(title: string, date: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!title || title.trim().length === 0) {
    errors.push('Activity title is required')
  }
  if (title.length > 100) {
    errors.push('Activity title must be less than 100 characters')
  }
  if (!date) {
    errors.push('Activity date is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateTimeBlock(startTime: string, endTime: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!startTime) {
    errors.push('Start time is required')
  }
  if (!endTime) {
    errors.push('End time is required')
  }

  if (startTime && endTime && startTime >= endTime) {
    errors.push('End time must be after start time')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
