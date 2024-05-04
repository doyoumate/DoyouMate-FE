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

export type { StudentResponse }
