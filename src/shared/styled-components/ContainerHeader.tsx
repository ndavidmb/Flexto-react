import { FC, ReactNode } from 'react'
import { PageTitle } from './PageTitle'

type Props = {
  children?: ReactNode
  title: string
  className?: string
}

export const ContainerHeader: FC<Props> = ({
  children,
  title,
  className = '',
}) => {
  return (
    <div
      className={`md:flex gap-2 justify-between items-center h-20 px-8 ${className}`}
    >
      <PageTitle>{title}</PageTitle>

      {children}
    </div>
  )
}
