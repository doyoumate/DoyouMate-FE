import { GET, PATCH } from '../../lib/axios/methods.ts'
import { FilterResponse, LectureResponse } from './types/response'
import { SearchLecturePageRequest } from './types/request'

const searchLecturePage = (request: SearchLecturePageRequest, size: number, lastId?: string) =>
  GET<LectureResponse[]>(`/lecture`, {
    ...request,
    size,
    ...(lastId && { lastId })
  })

const getLecturesByIds = (ids: string[]) => GET<LectureResponse[]>(`/lecture`, { ids: ids.join(',') })

const getFilter = () => GET<FilterResponse>('/lecture/filter')

const markLectureById = (id: string) => PATCH(`/lecture/${id}/mark`)

export { searchLecturePage, getLecturesByIds, getFilter, markLectureById }
