import { DELETE, GET, PATCH, POST, PUT } from '../../lib/axios/methods.ts'
import { CreatePostRequest, SearchPostPageRequest, UpdatePostRequest } from './types/request'
import { PostResponse } from './types/response'
import { getFormData } from '../../lib/util/formData.ts'

const getPostById = (id: string) => GET<PostResponse>(`/post/${id}`)

const getMyPostPage = (size: number, lastCreatedDate?: string) =>
  GET<PostResponse[]>(`/post/my`, {
    size,
    ...(lastCreatedDate && { lastCreatedDate })
  })

const getLikedPostPage = (size: number, lastCreatedDate?: string) =>
  GET<PostResponse[]>(`/post/liked`, {
    size,
    ...(lastCreatedDate && { lastCreatedDate })
  })

const getPopularPosts = () => GET<PostResponse[]>(`/post/popular`)

const searchPostPage = (request: SearchPostPageRequest, size: number, lastCreatedDate?: string) =>
  GET<PostResponse[]>(`/post`, {
    ...request,
    size,
    ...(lastCreatedDate && { lastCreatedDate })
  })

const createPost = (request: CreatePostRequest) => {
  const formData = getFormData(request)

  return POST<PostResponse>(`/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
const likePostById = (id: string) => PATCH<PostResponse>(`/post/${id}/like`)

const updatePostById = (id: string, request: UpdatePostRequest) => {
  const formData = getFormData(request)

  return PUT<PostResponse>(`/post/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const deletePostById = (id: string) => DELETE(`/post/${id}`)

export {
  getPostById,
  getMyPostPage,
  getLikedPostPage,
  getPopularPosts,
  searchPostPage,
  createPost,
  likePostById,
  updatePostById,
  deletePostById
}
