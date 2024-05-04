import { GET, POST } from '../../lib/axios.ts'
import { CommentResponse } from './dto/response'
import { CreateCommentRequest } from './dto/request'

const getCommentsByPostId = (postId: string) => GET<CommentResponse[]>(`/comment/postId/${postId}`)

const createComment = (request: CreateCommentRequest) => POST<CommentResponse>(`/comment`, request)

export { getCommentsByPostId, createComment }
