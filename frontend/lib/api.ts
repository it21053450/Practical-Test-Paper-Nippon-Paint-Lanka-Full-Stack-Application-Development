import axios from 'axios'
import toast from 'react-hot-toast'
import { API_CONFIG } from '@/config/api'

const API_BASE_URL = API_CONFIG.BASE_URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
    toast.error(errorMessage)
    return Promise.reject(error)
  }
)

export interface Material {
  id: number
  name: string
  code: string
  batch: string
  createdAt: string
  updatedAt: string
}

export interface MaterialRequest {
  name: string
  code: string
  batch: string
}

// Materials API
export const materialsAPI = {
  getAll: () => api.get<Material[]>('/api/materials'),
  
  getById: (id: number) => api.get<Material>(`/api/materials/${id}`),
  
  create: (material: MaterialRequest) => api.post<Material>('/api/materials', material),
  
  update: (id: number, material: MaterialRequest) =>
    api.put<Material>(`/api/materials/${id}`, material),
  
  delete: (id: number) => api.delete(`/api/materials/${id}`),
}
