import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCustomizationById } from '../../customizations/services/customization.service'

export const useTheme = () => {
  const [theme, setTheme] = useState<{
    menu: string
    background: string
    primary: string
  } | null>(null)

  const navigate = useNavigate()
  const { residentialId } = useParams()

  useEffect(() => {
    if (residentialId) {
      getCustomizationById(residentialId.toString())
        .then((theme) => {
          if (theme?.primary) {
            setTheme(theme)
            return
          }

          setTheme(null)
          navigate('/404')
        })
        .catch((err) => console.error(err))
    }
  }, [residentialId])

  return { theme }
}
