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
      commentIds?: string[]
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
    setCommentIds: (state: PostStates, action: PayloadAction<{ id: string; commentIds: string[] }>) => ({
      ...state,
      comment: {
        ...state.comment,
        [action.payload.id]: {
          commentIds: action.payload.commentIds
        }
      }
    }),
    setSearchRequest: (state: PostStates, action: PayloadAction<SearchPostPageRequest>) => ({
      ...state,
      searchRequest: action.payload
    })
  }
})

export const { setLikedStudentIds, setCommentIds, setSearchRequest } = postSlice.actions
export default postSlice.reducer
