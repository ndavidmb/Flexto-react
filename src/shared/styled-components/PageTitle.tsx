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
    <h1 className={className && ` ${className}`}>
      {children}
    </h1>
  )
}
