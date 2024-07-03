import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchPostPageRequest } from '../../module/post/types/request'

type PostStates = {
  like: {
    [key: string]: {
      likedStudentIds?: string[]
    }
  }
  comment: {
    [key: string]: {
      count: number
    }
  }
  searchRequest: SearchPostPageRequest
}

const postSlice = createSlice({
  name: 'post',
  initialState: {
    like: {},
    comment: {},
    searchRequest: { content: '' }
  } as PostStates,
  reducers: {
    setLikedStudentIds: (state: PostStates, action: PayloadAction<{ id: string; likedStudentIds: string[] }>) => ({
      ...state,
      like: {
        ...state.like,
        [action.payload.id]: {
          likedStudentIds: action.payload.likedStudentIds
        }
      }
    }),
    setCommentCount: (state: PostStates, action: PayloadAction<{ id: string; count: number }>) => ({
      ...state,
      comment: {
        ...state.comment,
        [action.payload.id]: {
          count: action.payload.count
        }
      }
    }),
    setSearchRequest: (state: PostStates, action: PayloadAction<SearchPostPageRequest>) => ({
      ...state,
      searchRequest: action.payload
    })
  }
})

export const { setLikedStudentIds, setCommentCount, setSearchRequest } = postSlice.actions
export default postSlice.reducer
