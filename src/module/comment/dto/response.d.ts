import { WriterResponse } from '../../board/dto/response'

interface CommentResponse {
  id: string
  postId: string
  writer: WriterResponse
  content: string
  likedStudentsIds: string[]
  createdDate: string
}

export type { CommentResponse }
