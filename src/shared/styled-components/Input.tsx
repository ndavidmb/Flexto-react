import { Field } from 'formik'
import { FC } from 'react'

type Props = {
  name: string
  type: 'email' | 'password' | 'text' | 'number' | 'date'
  placeholder: string
  disabled?: boolean
  className?: string
}

export const Input: FC<Props> = ({
  name,
  placeholder,
  type,
  disabled = false,
  className = '',
}) => {
  return (
    <Field
      id={name}
      className={`
        ${className}
          border
          h-8
          bg-white
          px-2
          rounded
          py-1
        `}
      name={name}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
  )
}
