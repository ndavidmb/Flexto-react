import { useEffect, useState } from 'react'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { useActViewController } from '../controllers/act.view.controller'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { ActTemplatesList } from './ActTemplatesList'

export const ActUserList = () => {
  const [acts, setActs] = useState<ActTemplate[]>([])
  const [allActs, setAllActs] = useState<ActTemplate[]>([])

  const actViewController = useActViewController()

  useEffect(() => {
    actViewController.getActsByOwner().then((acts) => {
      setActs(acts)
      setAllActs(acts)
    })
  }, [])

  const handleDelete = async (act: ActTemplate) => {
    await actViewController.deleteUserPermissionAct(act)
    setActs(
      acts.filter(
        (currentActs) => currentActs.id !== act.id,
      ),
    )
  }

  return (
    <DefaultContainerWithSearch
      title="Actas y Documentos"
      searchOptions={{
        allItems: allActs,
        searchKeys: [
          'documentName',
          'templateName',
          'date',
        ],
        setItems: setActs,
      }}
    >
      <ActTemplatesList
        templates={acts}
        labelsName={'del documento'}
        deleteTemplate={(id) => handleDelete(id)}
      />
    </DefaultContainerWithSearch>
  )
}
