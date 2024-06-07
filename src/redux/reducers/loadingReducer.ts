import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingStates {
  isLoading: boolean
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isLoading: false } as LoadingStates,
  reducers: {
    setIsLoading: (state: LoadingStates, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload
    })
  }
})

export const { setIsLoading } = loadingSlice.actions
export default loadingSlice.reducer
