import { parse, parseISO } from 'date-fns'
import type { IsDateOptions } from '../interfaces'

export const isDate = (value: unknown, options?: IsDateOptions): boolean => {
  if (typeof value !== 'string') {
    return false
  }

  try {
    return options?.format
      ? parse(value, options.format, new Date()).toString() !== 'Invalid Date'
      : parseISO(value).toString() !== 'Invalid Date'
  } catch {
    return false
  }
}
