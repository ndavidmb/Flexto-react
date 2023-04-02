import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export const Card: FC<Props> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`${className} bg-white border-gray-200 shadow p-4`}
    >
      {children}
    </div>
  )
}
