import { onAuthStateChanged, User } from 'firebase/auth'
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
import { authFirebase } from './shared/services/firebase.service'
import { useAppDispatch } from './shared/store/hooks'
import { logout } from './shared/store/slices/auth/authSlice'
import { validateUser } from './shared/store/slices/auth/thunks'
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

  useEffect(() => {
    const invalidUser = () => {
      dispatch(logout())
    }

    const validUser = async (user: User) => {
      await dispatch(validateUser(user))
    }

    onAuthStateChanged(authFirebase, async (user) => {
      if (user) {
        await validUser(user)
        return
      }

      invalidUser()
    })
  }, [])

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
  }, [theme?.id])

  return (
    <>
      <Toast />
      {theme ? <Outlet /> : <LoadingSvg />}
    </>
  )
}

export default App
