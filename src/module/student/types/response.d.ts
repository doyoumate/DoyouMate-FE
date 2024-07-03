interface StudentResponse {
  id: string
  number: string
  name: string
  birthDate: string
  phoneNumber: string
  major: string
  grade: number
  semester: string
  status: string
  gpa?: number
  rank?: number
  markedLectureIds: string[]
}

interface AppliedStudentResponse {
  id: string
  major: string
  grade: number
  gpa?: number
}

interface ChapelResponse {
  date: string
  room: string
  seat: string
  attendances: Attendance[]
}

interface Attendance {
  date: string
  isAttended: boolean
  isOnline: boolean
}

export type { StudentResponse, AppliedStudentResponse, ChapelResponse }
