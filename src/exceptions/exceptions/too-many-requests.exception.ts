import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class TooManyRequestsException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: message ?? HttpMessage.TOO_MANY_REQUESTS,
      details,
    })
  }
}
