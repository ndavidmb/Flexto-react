import { FC, ReactNode } from 'react'
import { Loading } from '../Loading/Loading'
import { Sidebar } from '../Sidebar/Sidebar'
import styles from './DefaultContainer.module.scss'

type Props = {
  children: ReactNode
}

export const DefaultContainer: FC<Props> = ({
  children,
}) => {
  return (
    <main className="h-screen w-full flex">
      <Sidebar />
      <section
        className={`w-full bg-gray-50 h-full ${styles.container}`}
      >
        {children}
      </section>
      <Loading />
    </main>
  )
}
