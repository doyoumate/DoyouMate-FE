import { BoardResponse, WriterResponse } from '../../board/dto/response'

interface PostResponse {
  id: string
  board: BoardResponse
  writer: WriterResponse
  title: string
  content: string
  likedStudentIds: string[]
  commentIds: string[]
  createdDate: string
}

export type { PostResponse }
