// import { getCustomizationById } from '../../../../src/customizations/services/customization.service'
// import { AppDispatch, RootState } from '../../store'
// import { setLoading } from '../loading/loadingSlice'
// import { setTheme } from './themeSlice'

// export const getTheme = (id: string) => {
//   return async (
//     dispatch: AppDispatch,
//     state: () => RootState,
//   ) => {
//     dispatch(setLoading(true))
//     const theme = await getCustomizationById(id)
//     dispatch(setTheme(theme))
//     dispatch(setLoading(false))

//     return state().themeState
//   }
// }
