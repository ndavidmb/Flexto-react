export function getFormattedDate(date: Date) {
  const year = date.getFullYear()
  const month = (1 + date.getMonth())
    .toString()
    .padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return month + '/' + day + '/' + year
}

export function getInputInitialDate(date: Date) {
  const year = date.getFullYear()
  const month = (1 + date.getMonth())
    .toString()
    .padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return year + '-' + month + '-' + day
}
