import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './reducers/studentReducer.ts'
import alertReducer from './reducers/alertReducer.tsx'

const store = configureStore({
  reducer: {
    alert: alertReducer,
    student: studentReducer
  }
})

declare global {
  type Store = ReturnType<typeof store.getState>
}

export default store
