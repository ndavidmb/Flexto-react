import { createSlice } from '@reduxjs/toolkit'

export type ToastType =
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
interface IState {
  triggerToast: boolean
  title: string
  details: string[]
  type: ToastType
}

const initialValue: IState = {
  triggerToast: false,
  title: '',
  type: 'info',
  details: [],
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState: initialValue,
  reducers: {
    showToast: (
      state,
      {
        payload,
      }: {
        payload: {
          details: string[]
          type: ToastType
          title: string
        }
      },
    ) => {
      state.triggerToast = true
      state.details = payload.details
      state.title = payload.title
      state.type = payload.type
    },
    hiddenToast: (state) => {
      state.triggerToast = initialValue.triggerToast
      state.details = initialValue.details
      state.title = initialValue.title
      state.type = initialValue.type
    },
  },
})

export const { showToast, hiddenToast } = toastSlice.actions
