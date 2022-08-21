import { FC, ReactNode } from 'react'
import { Button } from '../../styled-components/Button'
import { ContainerHeader } from '../../styled-components/ContainerHeader'
import { SearchInput } from '../../styled-components/SearchInput'
import { DefaultContainer } from '../DefaultContainer/DefaultContainer'

type Props = {
  actionName?: string
  title: string
  children: ReactNode
  action: () => void
}

export const DefaultContainerWithSearch: FC<Props> = ({
  children,
  title,
  actionName = 'Crear nuevo',
  action,
}) => {
  return (
    <DefaultContainer>
      <ContainerHeader title={title}>
        <Button color="primary" onClick={() => action()}>
          {actionName}
        </Button>
        <SearchInput placeholder="Buscar" />
      </ContainerHeader>
      <div className="px-4">{children}</div>
    </DefaultContainer>
  )
}
