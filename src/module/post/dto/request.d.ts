interface SearchPostsRequest {
  boardId?: string
  content: string
}

interface CreatePostRequest {
  boardId: string
  title: string
  content: string
}

export type { SearchPostsRequest, CreatePostRequest }
