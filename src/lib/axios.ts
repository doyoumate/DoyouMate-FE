import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  paramsSerializer: params =>
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
})

export default api
