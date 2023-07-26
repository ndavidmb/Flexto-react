// import { useState } from 'react'
// import { ActTextEditor } from '../components/ActTextEditor'
// import { OutputData } from '@editorjs/editorjs'
// import { Button } from '../../shared/styled-components/Button'
// import { usePdfPrinter } from '../../shared/hooks/usePdfPrinter'
// import { useEditorJsParser } from '../../shared/hooks/useEditorJsParser'
// import { PageTitle } from '../../shared/styled-components/PageTitle'
// import { Card } from '../../shared/styled-components/Card'

// export const ActTemplatesEditor = () => {
//   const [data, setData] = useState<OutputData | null>(null)

//   const pdfPrinter = usePdfPrinter()
//   const editorJsParser = useEditorJsParser()

//   const handleSave = () => {
//     if (!data) {
//       return
//     }

//     const html = editorJsParser.parse(data)
//     pdfPrinter.printHtml(html)
//   }

//   return (
//     <section className='flex gap-2 h-full'>
//       <aside className="xl:w-3/4 sm:w-full flex flex-col">
//         <div className="flex justify-between mb-2 items-center">
//           <PageTitle>Diseñe su plantilla</PageTitle>
//           <Button color="primary" onClick={handleSave}>
//             Guardar
//           </Button>
//         </div>
//         <div className="border rounded overflow-auto h-full shadow">
//           <ActTextEditor currentData={setData} />
//         </div>
//       </aside>
//       <Card className='h-full rounded'>
//         <h2>Seleccione una plantilla previa</h2>
//         <ul>
//           <li>Test.pdf</li>
//         </ul>
//       </Card>
//     </section>
//   )
// }
