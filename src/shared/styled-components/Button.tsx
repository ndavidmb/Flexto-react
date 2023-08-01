import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
  color: 'primary' | 'secondary' | 'warning' | 'link'
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
}

export const Button: FC<Props> = ({
  children,
  color,
  onClick,
  className = '',
  type = 'button',
}) => {
  const colorsTypes = {
    primary: 'bg-primary',
    secondary: 'bg-gray-200 !text-gray-600',
    warning: 'bg-yellow-400',
    link: 'text-primary',
  }

  const buttonClass =
    color !== 'link'
      ? `button ${colorsTypes[color]}`
      : `font-medium hover:underline ${colorsTypes[color]}`

  return type === 'submit' ? (
    <button
      type={type}
      className={`min-w-max ${buttonClass} ${className}`}
    >
      {children}
    </button>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={`min-w-max ${buttonClass} ${className}`}
    >
      {children}
    </button>
  )
}
