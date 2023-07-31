import { FC } from 'react'

type Props = {
  children: string
  htmlFor: string
  required?: boolean
}

export const Label: FC<Props> = ({
  children,
  htmlFor,
  required = false,
}) => {
  return (
    <label
      className="font-bold text-sm text-gray-600"
      htmlFor={htmlFor}
    >
      {children}
      {required && <span className="text-primary">*</span>}
    </label>
  )
}
