import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Table: FC<Props> = ({ children }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 shadow">
      {children}
    </table>
  )
}
