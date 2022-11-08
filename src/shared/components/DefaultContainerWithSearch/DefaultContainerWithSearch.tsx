import { Dispatch, FC, ReactNode } from 'react'
import { Button } from '../../styled-components/Button'
import { ContainerHeader } from '../../styled-components/ContainerHeader'
import { SearchInput } from '../../styled-components/SearchInput'
import { DefaultContainer } from '../DefaultContainer/DefaultContainer'

type Props = {
  actionName?: string
  title: string
  children: ReactNode
  action: () => void
  searchOptions: {
    searchKeys: string[]
    setApartments: Dispatch<React.SetStateAction<any[]>>
    items: any[]
  }
}

export const DefaultContainerWithSearch: FC<Props> = ({
  children,
  title,
  actionName = 'Crear nuevo',
  action,
  searchOptions,
}) => {
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
