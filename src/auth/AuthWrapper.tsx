import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { useAppDispatch } from '../shared/store/hooks'
import { emailAndPasswordSignIn } from '../shared/store/slices/auth/thunks'
import { RootState } from '../shared/store/store'
import { Button } from '../shared/styled-components/Button'
import { Input } from '../shared/styled-components/Input'
import { Login } from './components/Login'

export const AuthWrapper = () => {
  const { email } = useSelector(
    (state: RootState) => state.authState,
  )
  const { loading } = useSelector(
    (state: RootState) => state.loadingState,
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (email) {
      navigate('home/owners')
    }
  }, [email])

  return (
    <>
      {loading && <LoadingSvg />}
      <Login />
    </>
  )
}
