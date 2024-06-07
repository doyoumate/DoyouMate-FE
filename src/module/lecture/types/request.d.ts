interface SearchLecturePageRequest {
  year?: number
  grade?: number
  semester?: string
  major?: string
  name: string
  credit?: number
  section?: string

  [key: string]: string | number
}

export type { SearchLecturePageRequest }
