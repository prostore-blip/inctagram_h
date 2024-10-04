import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  authData: {
    isBlocked: false,
    myEmail: '' as string | undefined,
    myId: undefined as number | undefined,
    myUserName: '' as string | undefined,
  },
}

export type AppInitialStateType = typeof initialState

const slice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setMyEmail: (
      state,
      action: PayloadAction<{
        authData: {
          email: string | undefined
          isBlocked: false
          userId: number | undefined
          userName: string | undefined
        }
      }>
    ) => {
      state.authData.myEmail = action.payload.authData.email
      state.authData.myId = action.payload.authData.userId
      state.authData.myUserName = action.payload.authData.userName
      state.authData.isBlocked = action.payload.authData.isBlocked
    },
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
