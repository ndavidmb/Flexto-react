import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}
export const PageTitle: FC<Props> = ({
  children,
  className = '',
}) => {
  return (
    <h1
      className={`text-3xl font-bold text-black ${className}`}
    >
      {children}
    </h1>
  )
}
