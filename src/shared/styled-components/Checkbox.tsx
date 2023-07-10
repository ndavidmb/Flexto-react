import { Field } from 'formik'
import { FC } from 'react'
import { Days } from '../../public-spaces/interfaces/public-space.interface'

type Props = {
  name: string
  formik?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: Days
  checked?: boolean
}
export const Checkbox: FC<Props> = ({
  name,
  formik = false,
  onChange,
  value,
  checked,
}) => {
  return formik ? (
    <Field
      id={name}
      type="checkbox"
      className="accent-primary w-4 h-4"
      name={name}
    />
  ) : (
    <input
      id={name}
      type="checkbox"
      onChange={onChange}
      value={value}
      className="accent-primary w-4 h-4"
      checked={checked}
    />
  )
}
