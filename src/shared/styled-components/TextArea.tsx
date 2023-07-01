import { Field, useField } from 'formik'
import { FC } from 'react'

type Props = {
  placeholder: string
  name: string
  rows?: number
  cols?: number
}

export const TextArea: FC<Props> = ({
  name,
  placeholder,
  rows,
  cols,
}) => {
  const [field, meta] = useField(name)
  return (
    <textarea
      name={name}
      value={meta.value}
      onChange={field.onChange}
      placeholder={placeholder}
      className="border p-2 rounded"
      rows={rows}
      cols={cols}
    ></textarea>
  )
}
