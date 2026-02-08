import axios, { AxiosInstance, AxiosError } from 'axios'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken') || localStorage.getItem('guestToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.data)
      return config
    })

    this.client.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.data)
        return response
      },
      (error: AxiosError) => {
        console.error('API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        })

        if (error.response?.status === 401) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('guestToken')
          window.location.href = '/'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string) {
    try {
      const response = await this.client.get<T>(url)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T>(url: string, data?: any) {
    try {
      const response = await this.client.post<T>(url, data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async put<T>(url: string, data?: any) {
    try {
      const response = await this.client.put<T>(url, data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async delete<T>(url: string) {
    try {
      const response = await this.client.delete<T>(url)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'Network error'
      console.error('Handled error:', message)
      return new Error(message)
    }
    return error
  }
}

export const apiClient = new ApiClient()
