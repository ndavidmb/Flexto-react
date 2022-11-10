import { Field } from 'formik'
import {
  DetailedHTMLProps,
  FC
} from 'react'

type Props = {
  formik?: boolean
} & DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

export const Select: FC<Props> = ({
  formik = false,
  className = '',
  ...props
}) => {
  let customClass = 'border bg-white px-2 py-1 outline-none'

  if (className) {
    customClass = `${customClass} ${className}`
  }

  if (formik) {
    return (
      <Field {...props} as="select" className={customClass}>
        <option value={undefined}>
          ---- Seleccione ----
        </option>
        {props.children}
      </Field>
    )
  }

  return (
    <select {...props} className={customClass}>
      <option value={undefined}>
        ---- Seleccione ----
      </option>
      {props.children}
    </select>
  )
}
