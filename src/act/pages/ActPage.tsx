import { SetStateAction, useEffect, useState } from 'react'
import { ActDefault } from '../components/ActDefault'
import { useActViewController } from '../controllers/act.view.controller'
import { useRequestViewController } from '../../client-requests/controllers/request.view.controller'
import { useModal } from '../../shared/hooks/useModal'
import { AdminRequest } from '../../client-requests/interfaces/request.interface'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'

export const ActPage = () => {
  const [actsUser, setActsUser] = useState<ActTemplate[]>(
    [],
  )
  const actViewController = useActViewController()

  useEffect(() => {
    actViewController.getActsByOwner().then((acts) => {
      setActsUser(acts)
    })
  }, [])

  return (
    <ActDefault
    acts={actsUser}
    />
  )
}
