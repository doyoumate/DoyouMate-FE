import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './reducers/studentReducer.ts'
import loadingReducer from './reducers/loadingReducer.ts'
import postReducer from './reducers/postReducer.ts'

const store = configureStore({
  reducer: {
    student: studentReducer,
    loading: loadingReducer,
    post: postReducer
  }
})

declare global {
  type Store = ReturnType<typeof store.getState>
}

export default store
