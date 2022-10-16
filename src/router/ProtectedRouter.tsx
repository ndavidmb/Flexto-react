import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from '../shared/store/store'

type Props = {
  children: ReactNode
}

export const ProtectedRouter: FC<Props> = ({
  children,
}) => {
  const { uid } = useSelector(
    (state: RootState) => state.authState,
  )
  const location = useLocation()

  const [, id] = location.pathname.split('/')

  return (
    <>
      {uid ? children : <Navigate to={`/${id}`} />}
    </>
  )
}
