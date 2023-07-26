import { it, describe, expect } from 'vitest'
import { ParsePaymentArrays } from '../utils/parse-payments-arrays'

describe('PaymentOwnerModelController', () => {
  it('should be return selected an unselected ownerIds', () => {
    const res = ParsePaymentArrays.sortSelectedOwnerIds([
      { ownerId: '1', selected: true },
      { ownerId: '2', selected: true },
      { ownerId: '3', selected: false },
    ])

    expect(res.selected.length).toBe(2)
    expect(res.noSelected.length).toBe(1)
  })
})
