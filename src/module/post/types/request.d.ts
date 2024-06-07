import { File } from '../../common'

interface SearchPostPageRequest {
  boardId?: string
  content: string
}

interface CreatePostRequest {
  boardId: string
  title: string
  content: string
  images: File[]
}

interface UpdatePostRequest {
  boardId: string
  title: string
  content: string
  images: File[]
  isImageUpdated?: boolean
}

export type { SearchPostPageRequest, CreatePostRequest, UpdatePostRequest }
