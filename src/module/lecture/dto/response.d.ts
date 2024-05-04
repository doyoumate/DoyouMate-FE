interface LectureResponse {
  id: string
  year: number
  grade: number
  semester: string
  major: string
  name: string
  professor: string
  room: string
  date: string
  credit: number
  section?: string
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

export type { LectureResponse, FilterResponse }
