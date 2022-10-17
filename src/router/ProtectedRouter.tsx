import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../shared/store/store'

type Props = {
  children: ReactNode
}

export const ProtectedRouter: FC<Props> = ({
  children,
}) => {
  const { authState, themeState } = useSelector(
    (state: RootState) => state,
  )

  return (
    <>
      {authState.uid ? (
        children
      ) : (
        <Navigate to={`/${themeState.theme?.id}/auth`} />
      )}
    </>
  )
}
