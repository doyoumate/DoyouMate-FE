import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    filter: filterReducer
  }
})

declare global {
  type Store = ReturnType<typeof store.getState>
}

export default store
