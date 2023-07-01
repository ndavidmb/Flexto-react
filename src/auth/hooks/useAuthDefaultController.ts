import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { useAuthViewController } from '../controllers/auth.view.controller'

export const useAuthDefaultController = () => {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )
  const authController = useAuthViewController(theme.id)
  return { authController }
}