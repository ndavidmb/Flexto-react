import { useSelector } from 'react-redux'
import { DefaultContainer } from '../shared/components/DefaultContainer/DefaultContainer'
import { RootState } from '../shared/store/store'
import { Button } from '../shared/styled-components/Button'
import { ContainerHeader } from '../shared/styled-components/ContainerHeader'
import { generateKey } from '../shared/utils/createKey'
import { CustomizationSelect } from './components/CustomizationSelect'
import { Theme } from './interfaces/theme.interface'
import { useCustomizationService } from './services/customization.service'

export const CustomizationWrapper = () => {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const customizationService = useCustomizationService()

  const save = () => {
    customizationService
      .updateCustomization(theme as Theme)
      .then(() => {
        location.reload()
      })
  }

  return (
    <>
      <DefaultContainer>
        <div className="w-full flex flex-col items-center mb-4 justify-center">
          <ContainerHeader title="Personalización" />
          <p className="text-gray-400">
            Configura y personaliza la paleta de colores de
            la interfaz de usuario
          </p>
        </div>
        {theme && (
          <section className="w-full flex flex-col items-center justify-center">
            <div className="w-3/4 shadow">
              {Object.entries(theme)
                // This sort the elements alphabetically for the title
                .sort(([, value1], [, value2]) =>
                  value1[1].localeCompare(value2[1]),
                )
                // This filter the 'id' key
                .filter(([key]) => key !== 'id')
                .map(([key, value], index) => {
                  const [color, customizationName] = value
                  return (
                    <CustomizationSelect
                      key={generateKey(key)}
                      id={key}
                      title={customizationName}
                      gray={index % 2 === 0}
                      defaultColor={color}
                    />
                  )
                })}
            </div>
            <Button
              className="mt-2 text-xl !py-4 !px-5"
              color="primary"
              onClick={save}
            >
              Guardar
            </Button>
          </section>
        )}
      </DefaultContainer>
    </>
  )
}
