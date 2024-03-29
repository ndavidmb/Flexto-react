import { FC, ReactNode, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/hooks'
import { setLoading } from '../../store/slices/loading/loadingSlice'
import { RootState } from '../../store/store'
import { Loading } from '../Loading/Loading'
import { Sidebar } from '../Sidebar/Sidebar'
import styles from './DefaultContainer.module.scss'

type Props = {
  children: ReactNode
  className?: string
}

export const DefaultContainer: FC<Props> = ({
  children,
  className = '',
}) => {
  const { role } = useSelector(
    (state: RootState) => state.authState,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (role === null) {
      dispatch(setLoading(true))
      return
    }
    dispatch(setLoading(false))
  }, [role])

  return (
    <main className="h-screen w-full md:flex">
      <Sidebar />
      <section
        className={`md:w-full bg-gray-50 h-full ${styles.container} ${className}`}
      >
        {children}
      </section>
      <Loading />
    </main>
  )
}
