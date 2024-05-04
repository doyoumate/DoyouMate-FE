import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { refresh } from '../module/auth/api.ts'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  paramsSerializer: params =>
    Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
})

api.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken')

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

api.interceptors.response.use(null, async error => {
  if (!error.config.isRefreshTry && error.response.status === 401) {
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    error.config.isRefreshTry = true

    if (refreshToken) {
      const response = await refresh({ refreshToken })

      await AsyncStorage.setItem('accessToken', response.accessToken)
      await AsyncStorage.setItem('refreshToken', response.refreshToken)

      return api.request(error.config)
    }
  }

  return Promise.reject(error)
})

const GET = async <T>(url: string, params?: { [key: string]: any }) => (await api.get<T>(url, { params })).data
const POST = async <T>(url: string, body?: any) => (await api.post<T>(url, body)).data
const PUT = async <T>(url: string, body?: any) => (await api.put<T>(url, body)).data
const PATCH = async <T>(url: string, body?: any) => (await api.patch<T>(url, body)).data
const DELETE = async <T>(url: string, body?: any) => (await api.delete<T>(url, body)).data

export { GET, POST, PUT, PATCH, DELETE }
