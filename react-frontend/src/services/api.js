import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:6060',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Form data API
export const formDataApi = {
  // Submit form data
  submitForm: async (formData) => {
    try {
      const response = await api.post('/api/form', formData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get all form data
  getAllFormData: async (search = '') => {
    try {
      const url = search ? `/api/dashboard?search=${encodeURIComponent(search)}` : '/api/dashboard'
      const response = await api.get(url)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Delete form data by ID
  deleteFormData: async (id) => {
    try {
      const response = await api.delete(`/api/dashboard/delete/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Export to Excel
  exportToExcel: async (search = '') => {
    try {
      const url = search ? `/api/export/excel?search=${encodeURIComponent(search)}` : '/api/export/excel'
      const response = await api.get(url, {
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Export to PDF
  exportToPdf: async (search = '') => {
    try {
      const url = search ? `/api/export/pdf?search=${encodeURIComponent(search)}` : '/api/export/pdf'
      const response = await api.get(url, {
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/actuator/health')
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export default api
