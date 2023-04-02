export const usePdfPrinter = () => {
  const printHtml = (htmlData: string | string[]) => {
    const windowRef = window.open(
      '',
      'PRINT',
      'height=650,width=900,top=100,left=150',
    )

    windowRef?.document.write(`<html><body>`)

    if (Array.isArray(htmlData)) {
      htmlData.forEach((elem: string) =>
        windowRef?.document.write(elem),
      )
    } else {
      windowRef?.document.write(htmlData)
    }

    windowRef?.document.write('</body></html>')

    windowRef?.document.close() // necessary for IE >= 10
    windowRef?.focus() // necessary for IE >= 10*/

    windowRef?.print()
    windowRef?.close()
  }

  return { printHtml }
}
