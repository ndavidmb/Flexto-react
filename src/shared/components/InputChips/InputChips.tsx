import { FC, useEffect } from 'react'
import { useChip } from '../../hooks/useChip'
import { Chip } from './Chip'

type Props = {
  id: string
  name: string
  className?: string
  formik: any
}
export const InputChips: FC<Props> = ({
  id,
  name,
  className = '',
  formik,
}) => {
  const {
    colspanSize,
    chips,
    errorMsg,
    formValue,
    inputValue,
    hidden,
    handleDelete,
    handleChangeValue,
    handleKey,
  } = useChip(formik.values.state)

  useEffect(() => {
    formik.values.state = formValue
  }, [formValue])

  return (
    <>
      <input
        type="hidden"
        id={id}
        name={name}
        onChange={formik.handleChange}
        value={formik.values.state}
      />
      <div
        className={` grid grid-cols-4 gap-1 border p-1 bg-white ${className}`}
      >
        {chips.map((chip) => (
          <Chip
            key={chip}
            chip={chip}
            handleDelete={handleDelete}
          />
        ))}

        <input
          style={{
            gridColumn: `${colspanSize}/4`,
          }}
          id={id}
          name={name}
          className={`${hidden ? 'hidden' : 'block'}`}
          value={inputValue}
          onChange={handleChangeValue}
          onKeyDown={(evt) => handleKey(evt)}
        />
      </div>
      <small
        className={`text-xs ${
          errorMsg ? 'text-red-700' : 'text-gray-400'
        }  ml-1 italic`}
      >
        {errorMsg || 'Debe separar por comas el valor'}
      </small>
    </>
  )
}
