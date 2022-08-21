import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '../../../../customizations/interfaces/theme.interface'

const initialValue = {
  theme: null as Theme | null,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialValue,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
