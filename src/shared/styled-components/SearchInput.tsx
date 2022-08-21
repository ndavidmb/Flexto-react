import { FC } from 'react'
import { IoSearch } from 'react-icons/io5'
type Props = {
  placeholder: string
}

export const SearchInput: FC<Props> = ({ placeholder }) => {
  return (
    <div className="relative">
      <input
        className="
        text-primary
        search-input
        border-primary
        bg-white
        placeholder:flex
        placeholder:items-center
        indent-4
        rounded
        px-4
        py-1
        h-7
        border"
        type="text"
        placeholder={placeholder}
      />
      <IoSearch
        className="absolute text-primary"
        style={{ top: '7px', left: '10px' }}
      />
    </div>
  )
}
