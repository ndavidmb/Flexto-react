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
  const defaultClass = 'button bg-gray-200 !text-gray-600'

  return (
    <Link
      to={href}
      className={
        className
          ? `${defaultClass} ${className}`
          : defaultClass
      }
    >
      {children}
    </Link>
  )
}
