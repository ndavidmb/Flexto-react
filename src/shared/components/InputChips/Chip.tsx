import { FC } from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
  chip: string
  handleDelete: (value: string) => void
}

export const Chip: FC<Props> = ({ chip, handleDelete }) => {
  return (
    <span
      title={chip}
      className="py-1 px-2 rounded-full text-gray-500 bg-gray-200 text-xs flex justify-between"
    >
      <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        {chip}
      </span>
      <button
        type="button"
        onClick={() => handleDelete(chip)}
      >
        <IoClose className="cursor-pointer" />
      </button>
    </span>
  )
}
