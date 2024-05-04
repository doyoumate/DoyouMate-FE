import { GET, PATCH } from '../../lib/axios.ts'
import { FilterResponse, LectureResponse } from './dto/response'
import { SearchLecturesRequest } from './dto/request'

const searchLectures = (request: SearchLecturesRequest, page: number, size: number) =>
  GET<LectureResponse[]>(`/lecture`, {
    ...request,
    page: page,
    size: size
  })

const getLecturesByIds = (ids: string[]) => GET<LectureResponse[]>(`/lecture`, { ids: ids.join(',') })

const getFilter = () => GET<FilterResponse>('/lecture/filter')

const markLectureById = (id: string) => PATCH(`/lecture/${id}/mark`)

export { searchLectures, getLecturesByIds, getFilter, markLectureById }
