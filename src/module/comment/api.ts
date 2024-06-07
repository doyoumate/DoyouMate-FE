import { DELETE, GET, POST } from '../../lib/axios/methods.ts'
import { CommentResponse } from './types/response'
import { CreateCommentRequest } from './types/request'

const getMyComments = () => GET<CommentResponse[]>(`/comment/my`)

const getCommentsByPostId = (postId: string) => GET<CommentResponse[]>(`/comment/postId/${postId}`)

const createComment = (request: CreateCommentRequest) => POST<CommentResponse>(`/comment`, request)

const deleteCommentById = (id: string) => DELETE(`/comment/${id}`)

export { getMyComments, getCommentsByPostId, createComment, deleteCommentById }
