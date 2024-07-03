interface BoardResponse {
  id: string
  name: string
}

interface WriterResponse {
  id: string
  major: string
  grade: number
  status: string
}

export type { BoardResponse, WriterResponse }
