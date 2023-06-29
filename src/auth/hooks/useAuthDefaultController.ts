import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { useAuthController } from '../controllers/auth.controller'

export const useAuthDefaultController = () => {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )
  const authController = useAuthController(theme.id)
  return { authController }
}