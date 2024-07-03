interface LectureResponse {
  id: string
  professorId: string
  year: number
  grade: number
  semester: string
  major: string
  name: string
  professorName: string
  room: string
  date: string
  credit: number
  section?: string
  type: string
  limitStudentCount: number
  limitStudentGrade: number[]
  note: string
  ratio: Ratio
}

interface FilterResponse {
  year: number[]
  grade: number[]
  semester: string[]
  major: string[]
  credit: number[]
  section: string[]

  [key: string]: (string | number)[]
}

interface Ratio {
  theory: number
  practice: number
}

export type { LectureResponse, FilterResponse, PlanResponse, Ratio }
