import { useEffect, useState } from 'react'
import {
  Navigate,
  Outlet,
  useParams
} from 'react-router-dom'
import { Toast } from './shared/components/Toast/Toast'
import { useThemeController } from './shared/hooks/useTheme'
import { useUserValidation } from './shared/hooks/useUserValidation'

export const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  if (!id) {
    return <Navigate to="/NotFound" replace />
  }

  const userValidation = useUserValidation(id)
  const themeController = useThemeController(id)

  useEffect(() => {
    themeController
      .setup()
      .then((theme) => {
        if (theme) {
          userValidation.getAsyncUser()
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <></>
  }

  return (
    <>
      <Toast />
      <Outlet />
    </>
  )
}

export default App