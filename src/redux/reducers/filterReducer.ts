import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterResponse } from '../../module/lecture/lecture'

const filterReducer = createSlice({
  name: 'filter',
  initialState: {} as FilterResponse,
  reducers: {
    setFilter: (state: FilterResponse, action: PayloadAction<FilterResponse>) =>
      action.payload
  }
})

export const { setFilter } = filterReducer.actions
export default filterReducer.reducer
