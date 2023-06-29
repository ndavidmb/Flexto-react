import {
  Navigate,
  Outlet,
  useParams,
} from 'react-router-dom'
import { Toast } from './shared/components/Toast/Toast'
import { useEffect, useState } from 'react'
import { useFbAuth } from './auth/hooks/useFbAuth'
import { useThemeController } from './shared/hooks/useTheme'

export const App = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  if (!id) {
    return <Navigate to="/NotFound" />
  }

  const themeController = useThemeController(id)
  const { getCurrentUser, getRedirectPath } = useFbAuth(id)

  useEffect(() => {
    // Setup theme
    themeController
      .setup()
      .then(() => getCurrentUser())
      .then((user) => getRedirectPath(user))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    // TODO: Loading auth screen
    return <></>
  }

  return (
    <>
      <Toast />
      <Outlet />
    </>
  )
}
