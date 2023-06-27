import { useDispatch } from 'react-redux'
import { useCustomizationService } from '../../customizations/services/customization.service'
import { setTheme } from '../store/slices/theme/themeSlice'
import { addStyle } from '../utils/addStyle'
import { useNavigate } from 'react-router-dom'

export const useThemeController = (paramId: string) => {
  const customizationService = useCustomizationService()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const setup = async () => {
    try {
      const theme =
        await customizationService.getCustomizationById(
          paramId,
        )
      dispatch(setTheme(theme))
      addStyle(theme)
      return theme
    } catch (err) {
      navigate('/NotFound')
    }
  }

  return { setup }
}
