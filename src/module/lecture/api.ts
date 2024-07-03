import { GET, PATCH } from '../../lib/axios/methods.ts'
import { FilterResponse, LectureResponse } from './types/response'
import { SearchLecturePageRequest } from './types/request'

const getRelatedLecturesById = (id: string) => GET<LectureResponse[]>(`/lecture/${id}/related`)

const searchLecturePage = (request: SearchLecturePageRequest, size: number, lastId?: string) =>
  GET<LectureResponse[]>(`/lecture`, {
    ...request,
    size,
    ...(lastId && { lastId })
  })

const getAppliedLectures = () => GET<LectureResponse[]>(`/lecture/my`)

const getPreAppliedLectures = () => GET<LectureResponse[]>(`/lecture/my/pre`)

const getFilter = () => GET<FilterResponse>('/lecture/filter')

const markLectureById = (id: string) => PATCH(`/lecture/${id}/mark`)

export {
  getRelatedLecturesById,
  searchLecturePage,
  getAppliedLectures,
  getPreAppliedLectures,
  getFilter,
  markLectureById
}
