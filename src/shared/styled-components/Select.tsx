import { Field } from 'formik'
import {
  FC
} from 'react'

type Props = {
  name: string
  children: JSX.Element[]
}

export const Select: FC<Props> = ({
  name,
  children,
}) => {
  return (
    <Field
      as="select"
      className="border
          h-8
          bg-white
          px-2
          rounded
          py-1"
      name={name}
      id={name}
    >
      {children}
    </Field>
  )
}
