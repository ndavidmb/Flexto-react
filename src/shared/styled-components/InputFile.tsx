import { FC, useRef, useState } from 'react'
import { resizeImage } from '../utils/resizeImage'

type Props = {
  id: string
  onChange: (value: { blob: Blob; name: string }) => void
  className?: string
  placeholder?: string
}
export const InputFile: FC<Props> = ({
  id,
  onChange,
  className = '',
  placeholder = 'No se ha seleccionado ningún archivo',
}) => {
  const [selectedFile, setSelectedFile] =
    useState(placeholder)
  const inputEl = useRef<HTMLInputElement | null>(null)

  const handleChanged = () => {
    const files = inputEl.current?.files

    if (!files || !files[0]) {
      return
    }

    const { type, name } = files[0]

    if (type.includes('image')) {
      resizeImage(files[0]).then((compressed) => {
        onChange({
          blob: compressed,
          name: compressed.name,
        })
        setSelectedFile(compressed.name)
      })
    }

    if (type.includes('pdf') || type.includes('docx')) {
      onChange({
        blob: files[0],
        name,
      })
      setSelectedFile(name)
    }
  }

  return (
    <>
      <label
        className={`border flex h-8 rounded cursor-pointer ${
          className ?? ''
        }`}
        htmlFor={id}
      >
        <div className="bg-primary text-white w-1/3 h-full rounded-l flex items-center justify-center">
          Seleccionar
        </div>
        <div className="text-gray-400 overflow-hidden w-2/3 whitespace-nowrap text-ellipsis pl-2 my-auto">
          {selectedFile}
        </div>
        <input
          id={id}
          ref={inputEl}
          className="hidden"
          type="file"
          onChange={() => handleChanged()}
        />
      </label>
    </>
  )
}
