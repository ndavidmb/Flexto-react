import { Field } from 'formik'
import { DetailedHTMLProps, FC } from 'react'

type Props = {
  formik?: boolean
  allowUndefined?: boolean
} & DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

export const Select: FC<Props> = ({
  formik = false,
  className = '',
  allowUndefined = true,
  ...props
}) => {
  let customClass = 'border rounded bg-white px-2 py-1 h-8 outline-none'

  if (className) {
    customClass = `${customClass} ${className}`
  }

  if (formik) {
    return (
      <Field {...props} as="select" className={customClass}>
        {allowUndefined && (
          <option value={undefined}>
            ---- Seleccione ----
          </option>
        )}

        {props.children}
      </Field>
    )
  }

  return (
    <select {...props} className={customClass}>
      {allowUndefined && (
        <option value={undefined}>
          ---- Seleccione ----
        </option>
      )}

      {props.children}
    </select>
  )
}
