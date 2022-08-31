import { Field } from 'formik'
import { FC } from 'react'

type Props = {
  name: string
  type: 'email' | 'password' | 'text' | 'number'
  placeholder: string
  className?: string
}

export const Input: FC<Props> = ({
  name,
  placeholder,
  type,
  className = '',
}) => {
  return (
    <Field
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
    />
  )
}
