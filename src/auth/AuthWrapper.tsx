import { useSelector } from 'react-redux'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { RootState } from '../shared/store/store'
import { Login } from './components/Login'

export const AuthWrapper = () => {
  const { loading } = useSelector(
    (state: RootState) => state.loadingState,
  )

  return (
    <>
      {loading && <LoadingSvg />}
      <Login />
    </>
  )
}
