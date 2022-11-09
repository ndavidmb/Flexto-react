import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Outlet,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useCustomizationService } from './customizations/services/customization.service'
import { Toast } from './shared/components/Toast/Toast'
import { useUserValidation } from './shared/hooks/useUserValidation'
import { useAppDispatch } from './shared/store/hooks'
import { setTheme } from './shared/store/slices/theme/themeSlice'
import { RootState } from './shared/store/store'
import { addStyle } from './shared/utils/addStyle'

function App() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { themeState } = useSelector(
    (state: RootState) => state,
  )

  const dispatch = useAppDispatch()
  const customizationService = useCustomizationService()

  useUserValidation(dispatch, id || '', navigate)

  useEffect(() => {
    if (id) {
      customizationService
        .getCustomizationById(id)
        .then((theme) => {
          if (theme) {
            dispatch(setTheme(theme))
            addStyle(theme)
          }
        })
        .catch((err) => {
          console.error(err)
          navigate('/NotFound')
        })
    }
  }, [themeState.theme?.id])

  if (themeState.theme) {
    return (
      <>
        <Toast />
        <Outlet />
      </>
    )
  }

  return <></>
}

export default App
