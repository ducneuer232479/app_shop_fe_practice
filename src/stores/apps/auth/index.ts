/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { registerAuthAsync } from './actions'

const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.typeError = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(registerAuthAsync.pending, (state, action) => {
      state.isLoading = true
    }),
      builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = !!action?.payload?.data?.email
        state.isError = !action?.payload?.data?.email
        state.message = action?.payload?.message
        state.typeError = action?.payload?.typeError
      }),
      builder.addCase(registerAuthAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = ''
        state.typeError = ''
      })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
