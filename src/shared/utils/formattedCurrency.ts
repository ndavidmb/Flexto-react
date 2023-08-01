const currency = Intl.NumberFormat('es-CO')

export function formattedCurrency(value: number) {
  return `$${currency.format(value)}`
}
