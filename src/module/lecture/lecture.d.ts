interface Lecture {
  id: string
  courseNumber: string
  code: string
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

interface SearchLecturesRequest {
  year?: number
  grade?: number
  semester?: string
  major?: string
  name: string
  credit?: number
  section?: string

  [key: string]: number | string
}

interface FilterResponse {
  year: Array<number>
  grade: Array<number>
  semester: Array<string>
  major: Array<string>
  credit: Array<number>
  section: Array<string>

  [key: string]: Array<string | number>
}

export type { Lecture, SearchLecturesRequest, FilterResponse }
