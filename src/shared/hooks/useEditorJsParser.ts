import { OutputData } from '@editorjs/editorjs'

// @ts-ignore
import edjsHTML from 'editorjs-html'

export const useEditorJsParser = () => {
  const parse = (data: OutputData) => {
    const edjsParser = edjsHTML()
    return edjsParser.parse(data) as string[]
  }

  return { parse }
}
