import { useEffect, useState } from 'react'
import { IoArrowBack, IoSave } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { BookingList } from '../../booking/components/BookingList'
import { useBookingViewController } from '../../booking/controllers/booking.view.controller'
import { BookingDTO } from '../../booking/interfaces/booking.interface'
import { DefaultContainer } from '../../shared/components/DefaultContainer/DefaultContainer'
import { Button } from '../../shared/styled-components/Button'
import { PageTitle } from '../../shared/styled-components/PageTitle'
import { useOwnerViewController } from '../controllers/owner.view.controller'
import { OwnerViewWithBookings } from '../interfaces/owner.view.interface'

export const OwnerDetailPage = () => {
  // React Hooks
  const [ownerVm, setOwnerVm] =
    useState<OwnerViewWithBookings>()
  const { ownerId } = useParams()

  const navigate = useNavigate()
  const ownerViewController = useOwnerViewController()
  const bookingViewController = useBookingViewController()

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

  const handleCancelBooking = (booking: BookingDTO) => {
    bookingViewController
      .deleteBooking(booking)
      .then((successfully) => {
        if (successfully) {
          setOwnerVm({
            owner: ownerVm!.owner!,
            apartment: ownerVm!.apartment,
            bookings: ownerVm!.bookings.filter(
              (b) => b.id !== booking.id,
            ),
          })
        }
      })
  }

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
        <BookingList
          handleDeleteBooking={handleCancelBooking}
          bookings={ownerVm?.bookings ?? []}
        />
      </section>
    </DefaultContainer>
  )
}
