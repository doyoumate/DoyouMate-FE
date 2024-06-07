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
  appliedLectureIds: string[]
  preAppliedLectureIds: string[]
  markedLectureIds: string[]
}

interface AppliedStudentResponse {
  id: string
  major: string
  grade: number
  gpa?: number
}

export type { StudentResponse, AppliedStudentResponse }
