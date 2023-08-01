import { FC } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { BookingDTO } from '../interfaces/booking.interface'
import { HOURS_NUM_TO_STRING } from '../../public-spaces/constants/hours'

type Props = {
  bookings: BookingDTO[]
  handleDeleteBooking: (booking: BookingDTO) => void
}

export const BookingList: FC<Props> = ({
  bookings,
  handleDeleteBooking,
}) => {
  return (
    <Table>
      <THead>
        <th scope="col">Espacio público</th>
        <th scope="col">Fecha</th>
        <th scope="col">Acciones</th>
      </THead>
      <tbody>
        {bookings.map((booking, index) => {
          return (
            <TRow index={index} key={booking.id}>
              <th scope="row">
                {booking.publicSpace.name}
              </th>
              <td>
                <div className="flex flex-col min-w-max">
                  {booking.date}
                  <span>
                    {`Hora ${
                      // @ts-ignore
                      HOURS_NUM_TO_STRING[booking.startHour]
                    } - ${
                      // @ts-ignore
                      HOURS_NUM_TO_STRING[booking.endHour]
                    }`}
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <Button
                    onClick={() =>
                      handleDeleteBooking(booking)
                    }
                    color="primary"
                  >
                    Cancelar reserva
                  </Button>
                </div>
              </td>
            </TRow>
          )
        })}
      </tbody>
    </Table>
  )
}
