import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class TooEarlyException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.TOO_EARLY,
      message: message ?? HttpMessage.TOO_EARLY,
      details,
    })
  }
}
