import { Dispatch, ReactNode } from 'react'
import { Button } from '../../styled-components/Button'
import { ContainerHeader } from '../../styled-components/ContainerHeader'
import { SearchInput } from '../../styled-components/SearchInput'
import { DefaultContainer } from '../DefaultContainer/DefaultContainer'
import { useNavigate } from 'react-router-dom'

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
  subtitle?: string
  action?: () => void
  actionName?: string
}

export function DefaultContainerWithSearch<T>({
  children,
  title,
  searchOptions,
  action,
  actionName = 'Crear nuevo',
  subtitle,
}: Props<T>) {
  return (
    <DefaultContainer>
      <ContainerHeader title={title} subtitle={subtitle}>
        <div className="md:flex gap-2 justify-end items-center">
          {action && (
            <Button
              className="absolute top-4 right-2 md:static"
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
      <div className="overflow-auto mt-3 md:mt-0 md:px-4">
        {children}
      </div>
    </DefaultContainer>
  )
}
