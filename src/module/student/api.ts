import { GET } from '../../lib/axios.ts'
import { StudentResponse } from './dto/response'

const getStudent = () => GET<StudentResponse>(`/student/me`)

const getAppliedStudentsByLectureId = (lectureId: string) =>
  GET<StudentResponse[]>(`/student/applied/lectureId/${lectureId}`)

const getPreAppliedStudentsByLectureId = (lectureId: string) =>
  GET<StudentResponse[]>(`/student/pre-applied/lectureId/${lectureId}`)

export { getStudent, getAppliedStudentsByLectureId, getPreAppliedStudentsByLectureId }
