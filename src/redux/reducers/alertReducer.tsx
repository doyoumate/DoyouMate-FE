import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  modal: boolean
  message?: string
}

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    modal: false
  } as State,
  reducers: {
    openModal: (state: State, action: PayloadAction<string>) => ({
      modal: true,
      message: action.payload
    }),
    closeModal: () => ({ modal: false })
  }
})

export const { openModal, closeModal } = alertSlice.actions
export default alertSlice.reducer
