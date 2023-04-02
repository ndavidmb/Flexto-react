// @ts-nocheck
import { FC, useEffect, useRef } from 'react'

import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import SimpleImage from '@editorjs/simple-image'
import Quote from '@editorjs/quote'
import Table from '@editorjs/table'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'

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
        header: {
          class: Header,
          tunes: ['alignmentTool'],
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true,
          tunes: ['alignmentTool'],
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          tunes: ['alignmentTool'],
        },
        table: Table,
        quote: Quote,
        alignmentTool: {
          class: AlignmentTuneTool,
          config: {
            default: 'center',
          },
        },
      },
    })
  }

  return (
    <>
      <div id={EDITOR_HOLDER_ID}></div>
    </>
  )
}
