import { AppliedStudentResponse, ChapelResponse, StudentResponse } from './types/response'
import { GET } from '../../lib/axios/methods.ts'

const getStudent = () => GET<StudentResponse>(`/student/me`)

const getAppliedStudentsByLectureId = (lectureId: string) =>
  GET<AppliedStudentResponse[]>(`/student/applied/lectureId/${lectureId}`)

const getPreAppliedStudentsByLectureId = (lectureId: string) =>
  GET<AppliedStudentResponse[]>(`/student/pre-applied/lectureId/${lectureId}`)

const getMyChapel = () => GET<ChapelResponse>(`/student/chapel`)

export { getStudent, getAppliedStudentsByLectureId, getPreAppliedStudentsByLectureId, getMyChapel }
