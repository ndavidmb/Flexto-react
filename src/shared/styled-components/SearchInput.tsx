import { ChangeEvent, Dispatch, FC, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { SearchOptions } from '../components/DefaultContainerWithSearch/DefaultContainerWithSearch'
type Props<T> = {
  placeholder: string
  searchOptions: SearchOptions<T>
}

export function SearchInput<T>({
  placeholder,
  searchOptions,
}: Props<T>) {
  const [searchValue, setSearchValue] = useState('')

  const ignoreCase = (str: string, inputValue: string) =>
    str.toLowerCase().trim().includes(inputValue)

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = evt.target

    const filtered = searchOptions.allItems.filter(
      (item) => {
        for (const searchKey of searchOptions.searchKeys) {
          const itemField = item[searchKey]

          if (
            typeof itemField === 'string' &&
            ignoreCase(itemField, inputValue)
          ) {
            return true
          }

          if (typeof itemField === 'number') {
            const strField = String(itemField)
            if (ignoreCase(strField, inputValue)) {
              return true
            }
          }
        }

        return false
      },
    )

    searchOptions.setItems(filtered)

    setSearchValue(inputValue)
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
