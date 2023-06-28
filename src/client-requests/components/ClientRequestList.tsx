import { useEffect, useState } from 'react'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { ClientRequest, TYPE_DICT } from '../interfaces/client-request.interface'



export const ClientRequestList = () => {
  // React hooks
  // clientRequests = []
  const [clientRequests, setClientRequests] = useState<
    ClientRequest[]
  >([])
  // clientRequests = []
  // Ciclos de vida del componente

  // OnInit Component
  useEffect(() => {
    // 1. clientRequests = []
    firestore.getAllFirestore().then((clients) => {
      // 3. // clientRequests = []
      setClientRequests(clients)
      // 4 clientRequests = [info]
    })
    // 2. clientRequests = []
  }, [])

  // Custom Hooks
  const firestore = useFirestore<ClientRequest>(
    FirestoreTable.REQUEST,
  )

  // TEMPLATE
  return (
    <>
      <Table>
        <THead>
          <th scope="col">Tipo</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha</th>
          <th scope="col">Estado</th>
        </THead>
        <tbody>
          {clientRequests.map((clientRequest, index) => (
            <TRow index={index} key={clientRequest.id}>
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap"
              >
                {TYPE_DICT[clientRequest.type]}
              </th>
              <td>{clientRequest.description}</td>
              <td>{clientRequest.dateDetail.date}</td>
              <td>{clientRequest.approved ? "Aprobado" : "Denegado"}</td>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  )
}
