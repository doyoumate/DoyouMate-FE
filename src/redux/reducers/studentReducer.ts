import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StudentResponse } from '../../module/student/dto/response'

const studentSlice = createSlice({
  name: 'student',
  initialState: {} as StudentResponse,
  reducers: {
    setStudent: (state: StudentResponse, action: PayloadAction<StudentResponse>) => action.payload
  }
})

export const { setStudent } = studentSlice.actions
export default studentSlice.reducer
