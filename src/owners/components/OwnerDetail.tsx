import { DefaultContainer } from '../../shared/components/DefaultContainer/DefaultContainer'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'

const Mock = {
  id: 'jkasdgashjgdfkasdjfg',
  name: 'Carlos jkasdhkdjsah',
  phone: '546412313',
  email: 'c@correo.com',
  apto: {
    apartmentNumber: '101',
    tower: 'A1',
  },
  states: [
    {
      affair: 'pago',
      detail: 'Adminstracion',
      state: ['Pago', 'No pago'],
    },
    {
      affair: 'Prestamo',
      detail: 'Salon X',
      state: ['Alquilado', 'No Alquilado'],
    },
    {
      affair: 'Prestamo',
      detail: 'Cancha',
      state: ['Alquilado', 'No Alquilado'],
    },
  ],
}

export const OwnerDetail = () => {
  return (
    <DefaultContainer>
      <div className="">
        <h1 className="text-3xl font-bold w-52 text-black">
          {Mock.name}
        </h1>
        <ul>
          <li>{Mock.phone}</li>
          <li>{Mock.email}</li>
          <li>
            {Mock.apto.apartmentNumber} - {Mock.apto.tower}
          </li>
        </ul>
      </div>
      <Table>
        <THead>
          <th scope="col">Asunto</th>
          <th scope="col">Detalle</th>
          <th scope="col">Estados</th>
        </THead>
        <tbody>
          {Mock.states.map((state, index) => {
            return (
              <TRow index={index}>
                <th scope="row">{state.affair}</th>
                <td>{state.detail}</td>
                <td>
                  <select id="estado-pago">
                    <option value="">
                      ---- Seleccione ----
                    </option>
                    {state.state.map((tstate) => {
                      return <option>{tstate}</option>
                    })}
                  </select>
                </td>
              </TRow>
            )
          })}
        </tbody>
      </Table>
    </DefaultContainer>
  )
}
