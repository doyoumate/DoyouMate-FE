import api from '../../lib/axios.ts'
import { FilterResponse, Lecture, SearchLecturesRequest } from './lecture'

const searchLectures = async (request: SearchLecturesRequest) => {
  const response = await api.get<Lecture[]>(`/lecture`, {
    params: request
  })

  return response.data
}

const getFilter = async () => {
  const response = await api.get<FilterResponse>('/lecture/filter')

  return response.data
}

export { searchLectures, getFilter }
