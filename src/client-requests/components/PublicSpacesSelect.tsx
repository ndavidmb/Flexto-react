import { FC, useEffect } from 'react'
import { PublicSpace } from '../../public-spaces/interfaces/public-space.interface'
import { Label } from '../../shared/styled-components/Label'
import { Select } from '../../shared/styled-components/Select'
import { useFormikContext } from 'formik'
import { RequestPublicSpaceForm } from '../interfaces/request-public-space.interface'

type Props = {
  publicSpaces: PublicSpace[]
}

export const PublicSpacesSelect: FC<Props> = ({
  publicSpaces,
}) => {
  const formikContext =
    useFormikContext<RequestPublicSpaceForm>()

  useEffect(() => {
    if (!publicSpaces[0]?.id) {
      return
    }

    formikContext.setFieldValue(
      'publicSpaceId',
      publicSpaces[0].id,
    )
  }, [publicSpaces])

  return (
    <div className="w-full">
      <Label htmlFor="publicSpace">Espacio público</Label>
      <Select
        formik={true}
        allowUndefined={false}
        name="publicSpaceId"
        className="w-full"
      >
        {publicSpaces.map((space) => (
          <option key={space.id} value={space.id}>
            {space.name}
          </option>
        ))}
      </Select>
    </div>
  )
}
