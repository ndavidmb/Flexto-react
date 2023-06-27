import { Dispatch, ReactNode } from 'react'
import { Button } from '../../styled-components/Button'
import { ContainerHeader } from '../../styled-components/ContainerHeader'
import { SearchInput } from '../../styled-components/SearchInput'
import { DefaultContainer } from '../DefaultContainer/DefaultContainer'

type SearchKey<T> = {
  [key in keyof T]: T[key] extends string ? key : never
}[keyof T]

export type SearchOptions<T> = {
  searchKeys: SearchKey<T>[]
  setItems: Dispatch<React.SetStateAction<T[]>>
  allItems: T[]
}

type Props<T> = {
  actionName?: string
  title: string
  children: ReactNode
  action: () => void
  searchOptions: SearchOptions<T>
}

export function DefaultContainerWithSearch<T>({
  children,
  title,
  actionName = 'Crear nuevo',
  action,
  searchOptions,
}: Props<T>) {
  return (
    <DefaultContainer>
      <ContainerHeader title={title}>
        <Button color="primary" onClick={() => action()}>
          {actionName}
        </Button>
        <SearchInput
          searchOptions={searchOptions}
          placeholder="Buscar"
        />
      </ContainerHeader>
      <div className="px-4">{children}</div>
    </DefaultContainer>
  )
}
