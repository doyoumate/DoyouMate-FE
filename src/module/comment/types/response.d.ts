import { WriterResponse } from '../../board/types/response'

interface CommentResponse {
  id: string
  postId: string
  commentId?: string
  writer: WriterResponse
  content: string
  likedStudentsIds: string[]
  createdDate: string
  deletedDate?: string
}

export type { CommentResponse }
