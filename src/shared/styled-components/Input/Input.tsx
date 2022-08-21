import { Field } from 'formik'
import { FC } from 'react'
import styles from './Input.module.scss'

type Props = {
  name: string
  type: string
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
      ${styles['input-field']}
      border
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
