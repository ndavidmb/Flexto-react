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
    <div className={`flex gap-2 items-center h-20 px-8 ${className}`}>
      <PageTitle className="w-52">{title}</PageTitle>

      {children}
    </div>
  )
}
