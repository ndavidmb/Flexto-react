import { DefaultContainer } from '../../shared/components/DefaultContainer/DefaultContainer'
import { Button } from '../../shared/styled-components/Button'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'

const Mock = {
  access: [
      {
        id: 'jkasdgashjgdfkasdjfg',
        name: 'Carlos Hernandez',
        phone: '546412313',
        email: 'c@correo.com',
        petition: 'Hola soy carlos hernandez del del bloque A1 apto 302',
      },
      {
        id: 'jkasdgashjgdfkasdjfg',
        name: 'Marta Acuña',
        phone: '3148646514',
        email: 'Marta@correo.com',
        petition: 'Hola soy Marta del del bloque A1 apto 102 y me gustaria unirme a la aplicación',
      }
    ]
  }



export const AccessRequest = () => {
  const handleReject = () =>{
    // eslint-disable-next-line spaced-comment
    //TODO: Implementar funcion para rechazar
  }
  return (
    <DefaultContainer>
      <div className="">
        <h1 className="text-3xl font-bold w-52 text-black">
          Solicitudes de acceso
        </h1>
      </div>
      <Table>
        <THead>
          <th scope="col">Nombre</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Correo</th>
          <th scope="col">Petición</th>
          <th scope="col">Acción</th>
        </THead>
        <tbody>
          {Mock.access.map((acces, index) => (
            <TRow index={index} key={acces.name + index}>
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap"
              >
                {acces.name}
              </th>
              <td>{acces.phone}</td>
              <td>{acces.email}</td>
              <td>{acces.petition}</td>
              <td className="flex gap-2">
                <Button className="hover:text-blue-500 "
                  color="link"
                  onClick={() => open()}
                >
                  Aceptar
                </Button>
                <Button className="hover:text-red-700 !text-red-500"
                  color="link"
                  onClick={() =>
                    handleReject()
                  }
                >
                  Rechazar
                </Button>
              </td>
            </TRow>
          ))}
        </tbody>
      </Table>
    </DefaultContainer>
  )
}