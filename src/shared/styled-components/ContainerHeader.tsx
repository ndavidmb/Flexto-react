import { FC, ReactNode } from 'react'
import { PageTitle } from './PageTitle'

type Props = {
  children?: ReactNode
  title: string
  className?: string
  subtitle?: string
}

export const ContainerHeader: FC<Props> = ({
  children,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div
      className={`md:flex gap-2 justify-between items-center h-20 px-8 ${className}`}
    >
      <PageTitle>
        {title}
        {subtitle && <small className='block text-sm text-gray-500'>{subtitle}</small>}
      </PageTitle>

      {children}
    </div>
  )
}
