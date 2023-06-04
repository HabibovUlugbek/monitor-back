import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class RequestTimeoutException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.REQUEST_TIMEOUT,
      message: message ?? HttpMessage.REQUEST_TIMEOUT,
      details,
    })
  }
}
