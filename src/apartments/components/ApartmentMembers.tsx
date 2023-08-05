import { useFormikContext } from 'formik'
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from 'react-icons/ai'
import { Input } from '../../shared/styled-components/Input'
import { Label } from '../../shared/styled-components/Label'
import { ApartmentFromForm } from '../interfaces/apartment.interface'

export const ApartmentMembers = () => {
  const { values, setFieldValue } =
    useFormikContext<ApartmentFromForm>()

  const addMember = () => {
    const { memberName, memberPhone, members } = values

    // Reset
    setFieldValue('memberName', '')
    setFieldValue('memberPhone', '')

    setFieldValue('members', [
      ...members,
      { name: memberName, phone: memberPhone },
    ])
  }

  const removeMember = (memberName: string) => {
    const { members } = values

    setFieldValue(
      'members',
      members.filter(
        (member) => member.name !== memberName,
      ),
    )
  }
  return (
    <div className="flex flex-col text-gray-900">
      <Label htmlFor="name">
        Miembros de la residencia
      </Label>
      <div className="bg-gray-50 rounded p-2">
        <div className="flex w-full gap-2 justify-between">
          <div className="flex gap-2 w-full">
            <Input
              className="w-1/2"
              name="memberName"
              placeholder="Nombre Completo"
              type="text"
            />
            <Input
              className="w-1/2"
              name="memberPhone"
              placeholder="Teléfono"
              type="number"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addMember()}
            >
              <AiOutlineUserAdd size={20} />
            </button>
          </div>
        </div>
        <ul className="ml-2 mt-2">
          {values.members.map((member) => (
            <li
              key={member.name + member.phone}
              className="border-t"
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  {member.name}
                  <small>{member.phone}</small>
                </div>
                <button
                  onClick={() => removeMember(member.name)}
                  type="button"
                >
                  <AiOutlineUserDelete size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
