import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Outlet,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { CustomizationService } from './customizations/services/customization.service'
import { LoadingSvg } from './shared/components/Loading/Loading'
import { Toast } from './shared/components/Toast/Toast'
import { useAuthValidation } from './shared/hooks/useAuthValidation'
import { useAppDispatch } from './shared/store/hooks'
import { setTheme } from './shared/store/slices/theme/themeSlice'
import { RootState } from './shared/store/store'
import { addStyle } from './shared/utils/addStyle'

function App() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const dispatch = useAppDispatch()
  const customizationService = CustomizationService()

  useAuthValidation(navigate, id)

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
  }, [])

  return (
    <>
      <Toast />
      {theme ? <Outlet /> : <LoadingSvg />}
    </>
  )
}

export default App
