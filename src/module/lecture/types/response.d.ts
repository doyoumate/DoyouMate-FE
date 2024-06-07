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
  plan: PlanResponse
}

interface FilterResponse {
  year: number[]
  grade: number
  semester: string[]
  major: string[]
  credit: number[]
  section: string[]

  [key: string]: (string | number)[]
}

interface PlanResponse {
  ratio: Ratio
  overview: string
  objective: string
  type: string
  evaluation: string
  prerequisites: string
}

interface Ratio {
  theory: number
  practice: number
}

export type { LectureResponse, FilterResponse, PlanResponse, Ratio }
