import type { IsIntegerStringOptions } from '../interfaces'

export const isIntegerString = (value: unknown, options?: IsIntegerStringOptions): boolean => {
  if (typeof value !== 'string') {
    return false
  }

  const integer = value.match(/^(-)?(0+)?(\d+)$/)

  if (
    !integer ||
    (options?.disallowNegative === true && integer[1]) ||
    (options?.disallowLeadingZeros === true && integer[2])
  ) {
    return false
  }

  return Number.isInteger(parseInt(value, 10))
}
