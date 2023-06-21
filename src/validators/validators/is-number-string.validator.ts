import type { IsNumberStringOptions } from '../interfaces'

export const isNumberString = (value: unknown, options?: IsNumberStringOptions): boolean => {
  if (typeof value !== 'string') {
    return false
  }

  const number = value.match(/^(-)?(0+)?(\d+)(\.\d+)?$/)

  if (
    !number ||
    (options?.disallowNegative === true && number[1]) ||
    (options?.disallowLeadingZeros === true && number[2])
  ) {
    return false
  }

  if (options?.maxDecimalPlaces !== undefined) {
    let decimalPlaces = 0

    if (number[4]) {
      decimalPlaces = number[4].length - 1
    }

    if (decimalPlaces > options.maxDecimalPlaces) {
      return false
    }
  }

  return Number.isFinite(Number(value))
}
