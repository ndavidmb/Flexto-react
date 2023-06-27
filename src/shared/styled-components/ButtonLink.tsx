import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  href: string
  children: ReactNode
  className?: string
}

export const ButtonLink: FC<Props> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <Link
      to={href}
      className={
        className
          ? `button bg-gray-200 !text-gray-600 ${className}`
          : 'button bg-gray-200 !text-gray-600'
      }
    >
      {children}
    </Link>
  )
}
