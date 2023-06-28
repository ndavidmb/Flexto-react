import {
  Navigate,
  Outlet,
  useParams,
} from 'react-router-dom'
import { Toast } from './shared/components/Toast/Toast'
import { useEffect, useMemo } from 'react'
import { useSetup } from './shared/hooks/useSetup'

const id = 'JlBKitVmfWwm58ZHHs15'

export const App = () => {
  // const { id } = useParams()

  // if (!id) {
  //   return <Navigate to="/NotFound" />
  // }

  useSetup(id)

  useEffect(() => {
    console.log('rendered')
  }, [])

  return (
    <>
      <Toast />
      <Outlet />
    </>
  )
}
