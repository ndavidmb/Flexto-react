import { Field } from 'formik'
import { DetailedHTMLProps, FC } from 'react'

type Props = {
  formik?: boolean
  allowUndefined?: boolean
  multiple?: boolean // Add a new prop to handle multi-select
} & DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

export const MultiSelect: FC<Props> = ({
  formik = false,
  className = '',
  allowUndefined = true,
  multiple = false, // Set default value for multiple prop
  ...props
}) => {
  let customClass = 'border rounded bg-white px-2 py-1 h-8 outline-none'

  if (className) {
    customClass = `${customClass} ${className}`
  }

  if (formik) {
    return (
      <Field {...props} as="select" className={customClass} multiple={multiple}>
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
    <select {...props} className={customClass} multiple={multiple}>
      {allowUndefined && (
        <option value={undefined}>
          ---- Seleccione ----
        </option>
      )}

      {props.children}
    </select>
  )
}