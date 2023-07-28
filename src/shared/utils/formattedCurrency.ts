const currency = Intl.NumberFormat('es-CO')

export function formattedNumber(value: number) {
  return `$${currency.format(value)}`
}
