import { ChangeEvent, Dispatch, FC, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
type Props = {
  placeholder: string
  searchOptions: {
    searchKeys: string[]
    items: any[]
    setApartments: Dispatch<React.SetStateAction<any[]>>
  }
}

export const SearchInput: FC<Props> = ({
  placeholder,
  searchOptions,
}) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = evt.target

    console.log(searchOptions.items)

    const filtered = searchOptions.items.filter((item) => {
      for (const searchKey of searchOptions.searchKeys) {
        if (item[searchKey].includes(value)) {
          return true
        }
      }

      return false
    })

    searchOptions.setApartments(filtered)

    setSearchValue(value)
  }

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
        onChange={handleChange}
        value={searchValue}
        placeholder={placeholder}
      />
      <IoSearch
        className="absolute text-primary"
        style={{ top: '7px', left: '10px' }}
      />
    </div>
  )
}
