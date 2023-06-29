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
  title: string
  children: ReactNode
  searchOptions: SearchOptions<T>
  action?: () => void
  actionName?: string
}

export function DefaultContainerWithSearch<T>({
  children,
  title,
  searchOptions,
  action,
  actionName = 'Crear nuevo',
}: Props<T>) {
  return (
    <DefaultContainer>
      <ContainerHeader title={title}>
        <div className='flex gap-2 justify-end items-center'>
          {action && (
            <Button
              color="primary"
              onClick={() => action()}
            >
              {actionName}
            </Button>
          )}

          <SearchInput
            searchOptions={searchOptions}
            placeholder="Buscar"
          />
        </div>
      </ContainerHeader>
      <div className="px-4">{children}</div>
    </DefaultContainer>
  )
}
