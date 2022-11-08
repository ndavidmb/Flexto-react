import { DefaultContainer } from '../shared/components/DefaultContainer/DefaultContainer'
import { ContainerHeader } from '../shared/styled-components/ContainerHeader'

export const ClientRequestsWrapper = () => {
  return (
    <DefaultContainer>
      <div className="w-full flex flex-col items-center mb-4 justify-center">
        <ContainerHeader title="Realizar petición" />
      </div>
    </DefaultContainer>
  )
}
