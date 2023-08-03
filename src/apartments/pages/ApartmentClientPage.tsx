import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useForgetPasswordViewController } from '../../auth/controllers/forget-password.view.controller'
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
import { WarningSave } from '../components/WarningSave'
import { useApartmentViewController } from '../controllers/apartment.view.controller'
import {
  MemberInfo,
  Pet,
} from '../interfaces/apartment.interface'
import { Input } from '../../shared/styled-components/Input'

export const ApartmentClientPage = () => {
  const [ownerVw, setOwnerVw] = useState<OwnerView | null>(
    null,
  )
  const owner = useAppSelector((state) => state.authState)

  const { isOpen, openModal, closeModal } = useModal()

  const forgetPasswordViewController =
    useForgetPasswordViewController()
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
    licensePlate,
  }: {
    members: MemberInfo[]
    pets: Pet[]
    licensePlate: string
  }) => {
    if (!ownerVw) {
      return
    }
    const { apartment } = ownerVw

    apartmentViewController.updateApartment(apartment.id!, {
      ...apartment,
      extraInfo: {
        ...apartment.extraInfo,
        vehicle: {
          licensePlate,
        },
        members,
        pets,
      },
    })
  }

  const handleEdit = () => {
    openModal()
  }

  const handleChangePassword = () => {
    forgetPasswordViewController.sendValidationEmail(
      ownerVw!.owner.email,
    )
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
        <div className="bg-white rounded p-4 h-50 shadow flex flex-col md:flex-row justify-between">
          <div className="md:flex gap-3">
            {owner.photoUrl && (
              <img
                className="rounded object-cover !h-40 w-40"
                src={owner.photoUrl}
                width={150}
                alt="profile_img"
              />
            )}

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
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              onClick={handleChangePassword}
              className="gap-2"
              color="primary"
            >
              <RiLockPasswordFill />
              Cambiar contraseña
            </Button>
            <Button
              onClick={handleEdit}
              className="gap-2"
              color="primary"
            >
              <BsPencilSquare />
              Editar
            </Button>
          </div>
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
            licensePlate:
              ownerVw?.apartment.extraInfo?.vehicle
                .licensePlate ?? '',
          }}
          onSubmit={handleSubmit}
        >
          <Form className="h-[calc(100vh-15rem)]">
            <div className="bg-white mt-2 flex flex-col justify-between rounded h-[90%] shadow">
              <div className="overflow-auto p-4">
                <div className="w-full flex flex-col mb-2">
                  <Label htmlFor="licensePlate">
                    Licencia del vehículo
                  </Label>
                  <Input
                    name="licensePlate"
                    placeholder="Licencia de vehículo (Este campo es opcional y debe registrar la placa si tiene moto o carro)"
                    type="text"
                  />
                </div>

                <ApartmentMembers />

                <div className="w-full">
                  <Label htmlFor="petType">Mascotas</Label>
                  <ApartmentsPets />
                </div>
              </div>
              <div className="flex bg-gray-50 flex-col gap-2 border-t shadow-md justify-between items-end h-min p-4">
                <WarningSave
                  title="¡No olvide guardar los cambios!"
                  text="Antes de salir de esta página no olvide guardar los cambios"
                />
                <Button type="submit" color="primary">
                  Guardar
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </DefaultContainer>
    </>
  )
}
