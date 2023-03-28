import { useEffect, useState } from 'react'
import {
  Navigate,
  Outlet,
  useNavigate,
  useParams
} from 'react-router-dom'
import { useCustomizationService } from './customizations/services/customization.service'
import { Toast } from './shared/components/Toast/Toast'
import { useUserValidation } from './shared/hooks/useUserValidation'
import {
  useAppDispatch,
  useAppSelector
} from './shared/store/hooks'
import { setTheme } from './shared/store/slices/theme/themeSlice'
import { addStyle } from './shared/utils/addStyle'

export const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [validationEnds, setValidationEnds] =
    useState(false)
  const { id } = useParams()
  const { theme } = useAppSelector(
    (state) => state.themeState,
  )

  if (!id) {
    return <Navigate to="/NotFound" replace />
  }

  const customizationService = useCustomizationService()
  const { getAsyncUser } = useUserValidation(id)

  useEffect(() => {
    customizationService
      .getCustomizationById(id)
      .then((theme) => {
        if (!theme) {
          return false
        }

        dispatch(setTheme(theme))
        addStyle(theme)
        return getAsyncUser()
      })
      .then((userValidationEnds) => {
        setValidationEnds(userValidationEnds)
      })
      .catch(() => {
        navigate('/NotFound')
      })
  }, [])

  return (
    <div className={!theme || !validationEnds ? 'hidden' : ''}>
      <Toast />
      <Outlet />
    </div>
  )
}

export default App
