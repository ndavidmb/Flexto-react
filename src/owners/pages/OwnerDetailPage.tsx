import { useEffect, useState } from 'react'
import { IoArrowBack, IoSave } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { DefaultContainer } from '../../shared/components/DefaultContainer/DefaultContainer'
import { Button } from '../../shared/styled-components/Button'
import { PageTitle } from '../../shared/styled-components/PageTitle'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { useOwnerViewController } from '../controllers/owner.view.controller'
import { OwnerView } from '../interfaces/owner.view.interface'
import { HOURS_NUM_TO_STRING } from '../../public-spaces/constants/hours'

export const OwnerDetailPage = () => {
  // React Hooks
  const [ownerVm, setOwnerVm] = useState<OwnerView>()
  const { ownerId } = useParams()

  const navigate = useNavigate()
  const ownerViewController = useOwnerViewController()

  // Life cycle
  useEffect(() => {
    if (!ownerId) {
      return
    }

    ownerViewController
      .getOwnerDetail(ownerId)
      .then((vm) => {
        if (vm) {
          setOwnerVm(vm)
        }
      })
  }, [])

  const goBack = () => {
    navigate(-1)
  }

  return (
    <DefaultContainer>
      <header className="px-8 py-3 flex justify-between items-start">
        <div className="flex gap-3">
          <img
            className="rounded"
            src={ownerVm?.owner.photoUrl}
            width={150}
            alt="profile_img"
          />
          <div>
            <PageTitle>
              {ownerVm?.owner.displayName}
            </PageTitle>
            <ul className="text-gray-600">
              <li>
                <small className="font-bold block">
                  Teléfono
                </small>
                {ownerVm?.owner.phoneNumber}
              </li>
              <li>
                <small className="font-bold block">
                  Email
                </small>
                {ownerVm?.owner.email}
              </li>
              <li>
                <small className="font-bold block">
                  Apartamento
                </small>
                {ownerVm?.apartment.apartmentNumber} -{' '}
                {ownerVm?.apartment.tower}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-1 items-center mt-1">
          <button
            className="button bg-gray-200 !text-gray-600 flex gap-2"
            onClick={() => goBack()}
          >
            <IoArrowBack />
            Volver
          </button>
          <Button
            className="flex gap-2"
            type="button"
            color="primary"
          >
            <IoSave />
            Guardar
          </Button>
        </div>
      </header>

      <section className="px-8">
        <h1>Reservas</h1>
        <hr className="my-2" />
        <Table>
          <THead>
            <th scope="col">Espacio público</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
          </THead>
          <tbody>
            {ownerVm?.bookings.map((booking, index) => {
              return (
                <TRow index={index} key={booking.id}>
                  <th scope="row">
                    {booking.publicSpace.name}
                  </th>
                  <td>
                    <div className="flex flex-col">
                      {booking.date}
                      <span>
                        {`Hora ${
                          // @ts-ignore
                          HOURS_NUM_TO_STRING[
                            booking.startHour
                          ]
                        } - ${
                          // @ts-ignore
                          HOURS_NUM_TO_STRING[
                            booking.endHour
                          ]
                        }`}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <Button color="primary">
                        Cancelar reserva
                      </Button>
                    </div>
                  </td>
                </TRow>
              )
            })}
          </tbody>
        </Table>
      </section>
    </DefaultContainer>
  )
}
