import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { OwnerView } from '../../owners/interfaces/owner.view.interface'
import { EditProfile } from '../../profiles/components/EditProfile'
import { DefaultContainer } from '../../shared/components/DefaultContainer/DefaultContainer'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { useModal } from '../../shared/hooks/useModal'
import { useAppSelector } from '../../shared/store/hooks'
import { Button } from '../../shared/styled-components/Button'
import { Label } from '../../shared/styled-components/Label'
import { PageTitle } from '../../shared/styled-components/PageTitle'
import { ApartmentMembers } from '../components/ApartmentMembers'
import { ApartmentsPets } from '../components/ApartmentsPets'
import { useApartmentViewController } from '../controllers/apartment.view.controller'
import { BsPencilSquare } from 'react-icons/bs'
import {
  MemberInfo,
  Pet,
} from '../interfaces/apartment.interface'

export const ApartmentClientPage = () => {
  const [ownerVw, setOwnerVw] = useState<OwnerView | null>(
    null,
  )
  const owner = useAppSelector((state) => state.authState)

  const { isOpen, openModal, closeModal } = useModal()

  const apartmentViewController =
    useApartmentViewController()

  useEffect(() => {
    if (!owner.uid) {
      return
    }

    apartmentViewController
      .getApartmentByOwner(owner.uid)
      .then((data) => {
        setOwnerVw(data)
      })
  }, [owner.uid])

  const handleSubmit = ({
    members,
    pets,
  }: {
    members: MemberInfo[]
    pets: Pet[]
  }) => {
    if (!ownerVw) {
      return
    }
    const { apartment } = ownerVw

    apartmentViewController.updateApartment(apartment.id!, {
      ...apartment,
      extraInfo: {
        ...apartment.extraInfo,
        members,
        pets,
      },
    })
  }

  const handleEdit = () => {
    openModal()
  }

  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title="Editar perfil"
        >
          <EditProfile
            closeModal={closeModal}
            authState={owner}
          ></EditProfile>
        </ModalContainer>
      )}
      <DefaultContainer className="p-4 h-screen">
        <div className="bg-white rounded p-4 h-50 shadow flex justify-between">
          <div className="md:flex gap-3">
            <img
              className="rounded object-cover !h-40 w-40"
              src={owner.photoUrl}
              width={150}
              alt="profile_img"
            />
            <div>
              <PageTitle>{owner.displayName}</PageTitle>
              <ul className="text-gray-600">
                <li>
                  <small className="font-bold block">
                    Teléfono
                  </small>
                  {ownerVw?.owner.phoneNumber}
                </li>
                <li>
                  <small className="font-bold block">
                    Email
                  </small>
                  {owner.email}
                </li>
                <li>
                  <small className="font-bold block">
                    Unidad residencial
                  </small>
                  {ownerVw?.apartment?.apartmentNumber} -{' '}
                  {ownerVw?.apartment?.tower}
                </li>
              </ul>
            </div>
          </div>

          <Button
            onClick={handleEdit}
            className="gap-2"
            color="primary"
          >
            <BsPencilSquare />
            Editar
          </Button>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            memberName: '',
            memberPhone: '',
            members:
              ownerVw?.apartment.extraInfo?.members ?? [],
            petDescription: '',
            petQuantity: '1',
            petType: 'cat',
            pets: ownerVw?.apartment.extraInfo?.pets ?? [],
          }}
          onSubmit={handleSubmit}
        >
          <Form className="h-[calc(100vh-15rem)]">
            <div className="bg-white rounded p-4 h-[90%] shadow mt-2 overflow-auto">
              <ApartmentMembers />

              <div className="w-full">
                <Label htmlFor="petType">Mascotas</Label>
                <ApartmentsPets />
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </div>
          </Form>
        </Formik>
      </DefaultContainer>
    </>
  )
}
