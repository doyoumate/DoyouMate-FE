import { GET, PATCH, POST } from '../../lib/axios.ts'
import { CreatePostRequest, SearchPostsRequest } from './dto/request'
import { PostResponse } from './dto/response'

const getPopularPosts = () => GET<PostResponse[]>(`/post/popular`)

const searchPosts = (request: SearchPostsRequest, page: number, size: number) =>
  GET<PostResponse[]>(`/post`, {
    ...request,
    page: page,
    size: size
  })

const createPost = (request: CreatePostRequest) => POST<PostResponse[]>(`/post`, request)

const likePostById = (id: string) => PATCH<PostResponse>(`/post/${id}/like`)

export { getPopularPosts, searchPosts, createPost, likePostById }
