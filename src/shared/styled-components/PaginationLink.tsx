import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  active?: boolean
}
export const PaginationLink: FC<Props> = ({
  children,
  active = false,
}) => {
  return (
    <li
      className={`py-2 px-3 cursor-pointer leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-white ${
        active
          ? 'text-primary border-primary'
          : ' text-gray-500'
      }`}
    >
      {children}
    </li>
  )
}
