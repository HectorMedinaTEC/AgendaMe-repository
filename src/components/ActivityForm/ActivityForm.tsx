import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { useActivities } from '@/hooks/useActivities'
import { selectSelectedDate, selectIsGuest } from '@/redux/selectors'
import { showNotification } from '@/redux/slices/uiSlice'
import Modal from '@/components/shared/Modal'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Select from '@/components/shared/Select'
import { Activity } from '@/types'
import { validateActivityForm } from '@/utils/validators'

interface ActivityFormProps {
  onClose: () => void
  activity?: Activity
}

export default function ActivityForm({ onClose, activity }: ActivityFormProps) {
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector(selectSelectedDate)
  const isGuest = useAppSelector(selectIsGuest)
  const { createActivity, updateActivity } = useActivities()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [formData, setFormData] = useState({
    title: activity?.title || '',
    description: activity?.description || '',
    date: activity?.date || selectedDate || '',
    status: activity?.status || ('pending' as const),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const validation = validateActivityForm(formData.title, formData.date)
    if (!validation.valid) {
      const errorMap: { [key: string]: string } = {}
      validation.errors.forEach((error) => {
        if (error.includes('title')) errorMap.title = error
        if (error.includes('date')) errorMap.date = error
      })
      setErrors(errorMap)
      return
    }

    try {
      setLoading(true)

      if (activity) {
        await updateActivity(activity.id, {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          status: formData.status,
        })
        dispatch(showNotification({ message: 'Activity updated successfully', type: 'success' }))
      } else {
        await createActivity({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          status: formData.status,
          user_id: 'guest',
        })
        dispatch(showNotification({ message: 'Activity created successfully', type: 'success' }))
      }

      onClose()
    } catch (error) {
      dispatch(showNotification({
        message: error instanceof Error ? error.message : 'Failed to save activity',
        type: 'error',
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={true}
      title={activity ? 'Edit Activity' : 'New Activity'}
      onClose={onClose}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="title"
          name="title"
          type="text"
          label="Activity Title"
          placeholder="e.g., Team Meeting, Study Session"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          disabled={loading}
          required
          aria-required="true"
        />

        <div className="flex gap-4">
          <Input
            id="date"
            name="date"
            type="date"
            label="Date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            disabled={loading}
            required
            aria-required="true"
            className="flex-1"
          />

          <Select
            id="status"
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            className="flex-1"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Add details about this activity..."
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            rows={4}
            className="input-field resize-none"
          />
        </div>

        {isGuest && (
          <p className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded p-3">
            ℹ️ Guest mode: Data is stored locally. Create an account to sync across devices.
          </p>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="flex-1"
          >
            {activity ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
