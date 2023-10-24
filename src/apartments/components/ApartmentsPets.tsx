import { Field, useFormikContext } from 'formik'
import { Select } from '../../shared/styled-components/Select'
import { Input } from '../../shared/styled-components/Input'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import isEqual from 'lodash.isequal'
import {
  ApartmentFromForm,
  PET_TYPE,
  Pet,
} from '../interfaces/apartment.interface'

export const ApartmentsPets = () => {
  const { values, setFieldValue } =
    useFormikContext<ApartmentFromForm>()

  const addPet = () => {
    const newPet: Pet = {
      description: values.petDescription,
      quantity: values.petQuantity,
      type: values.petType,
    }

    setFieldValue('pets', [...values.pets, newPet])

    setFieldValue('petDescription', '')
    setFieldValue('petQuantity', '1')
    setFieldValue('petType', 'cat')
  }

  const removePet = (pet: Pet) => {
    setFieldValue(
      'pets',
      values.pets.filter((p) => !isEqual(p, pet)),
    )
  }

  return (
    <div className="bg-gray-50 rounded p-2 overflow-auto">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th>Tipo de mascota*</th>
            <th>Descripción</th>
            <th>Cantidad*</th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {values.pets.map((pet, index) => (
            <tr
              className="border-b"
              key={`${pet.type}${pet.description}${pet.quantity}${index}`}
            >
              <td className="text-center">
                {PET_TYPE[pet.type]}
              </td>
              <td className="text-center">
                {pet.description || 'No aplica'}
              </td>
              <td className="text-center">
                {pet.quantity}
              </td>
              <td className="w-8">
                <button
                  type="button"
                  onClick={() => removePet(pet)}
                >
                  <IoMdRemoveCircleOutline size={20} />
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td className="text-center">
              <Select
                className="w-52"
                formik={true}
                allowUndefined={false}
                name="petType"
              >
                <option value="cat">Gato</option>
                <option value="dog">Perro</option>
                <option value="other">Otro</option>
              </Select>
            </td>
            <td className="text-center">
              <Field
                className="h-8 border rounded mt-2 px-2"
                as="textarea"
                placeholder="Descripción"
                name="petDescription"
              />
            </td>
            <td className="text-center">
              <Input
                className="w-36"
                name="petQuantity"
                placeholder="Cantidad"
                type="number"
              />
            </td>
            <td className="w-8">
              <button
                type="button"
                onClick={() => addPet()}
              >
                <AiOutlinePlusCircle size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
