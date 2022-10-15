import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from '../store/store'

type Props = {
  children: ReactNode
}

export const ProtectedRouter: FC<Props> = ({
  children,
}) => {
  const { status } = useSelector(
    (state: RootState) => state.authState,
  )
  const location = useLocation()

  const [, id] = location.pathname.split('/');

  return <>{status ? children : <Navigate to={`/${id}`} />}</>
}
