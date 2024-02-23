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

export type { Lecture }
