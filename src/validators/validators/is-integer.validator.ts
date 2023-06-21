import type { IsIntegerOptions } from '../interfaces'

export const isInteger = (value: unknown, options?: IsIntegerOptions): boolean => {
  if (typeof value !== 'number' || (options?.disallowNegative === true && value < 0)) {
    return false
  }

  return Number.isInteger(value)
}
