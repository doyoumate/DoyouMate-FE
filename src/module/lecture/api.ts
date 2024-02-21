import api from '../../lib/axios.ts'
import { Lecture } from './lecture'

const getLectures = async () => {
  const response = await api.get<Lecture[]>('/lecture')

  return response.data
}

export { getLectures }
