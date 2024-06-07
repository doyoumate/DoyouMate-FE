import { BoardResponse, WriterResponse } from '../../board/types/response'

interface PostResponse {
  id: string
  board: BoardResponse
  writer: WriterResponse
  title: string
  content: string
  likedStudentIds: string[]
  commentIds: string[]
  images: string[]
  createdDate: string
}

export type { PostResponse }
