import { AxiosRequestConfig } from 'axios'
import api from './api.ts'

const GET = async <T>(url: string, params?: { [key: string]: any }) => (await api.get<T>(url, { params })).data
const POST = async <T>(url: string, body?: any, config?: AxiosRequestConfig<any>) =>
  (await api.post<T>(url, body, config)).data
const PUT = async <T>(url: string, body?: any, config?: AxiosRequestConfig<any>) =>
  (await api.put<T>(url, body, config)).data
const PATCH = async <T>(url: string, body?: any, config?: AxiosRequestConfig<any>) =>
  (await api.patch<T>(url, body, config)).data
const DELETE = async <T>(url: string, config?: AxiosRequestConfig<any>) => (await api.delete<T>(url, config)).data

export { GET, POST, PUT, PATCH, DELETE }
