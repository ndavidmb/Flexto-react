// @ts-nocheck
import { FC, useEffect, useRef } from 'react'

import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import SimpleImage from '@editorjs/simple-image'
import Quote from '@editorjs/quote'
import Table from '@editorjs/table'

const EDITOR_HOLDER_ID = 'editorjs'

type Props = {
  currentData: (data: OutputData) => void
}

export const ActTextEditor: FC<Props> = ({
  currentData,
}) => {
  const editorRef = useRef<EditorJS | null>(null)
  // const [editorData, setEditorData] = useState(
  //   DEFAULT_INITIAL_DATA,
  // )

  useEffect(() => {
    if (!editorRef.current) {
      initEditor()
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
      }
    }
  }, [])

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      // data: editorData,
      placeholder: 'Escriba su acta aquí',
      onReady: () => {
        editorRef.current = editor
      },
      onChange: (a) => {
        a.saver.save().then((data) => {
          currentData(data)
        })
      },
      tools: {
        header: Header,
        list: List,
        image: SimpleImage,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        table: Table,
        quote: Quote,
      },
    })
  }

  return (
    <>
      <div id={EDITOR_HOLDER_ID}></div>
    </>
  )
}
