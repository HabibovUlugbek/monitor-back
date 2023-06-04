import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class ServiceUnavailableException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: message ?? HttpMessage.SERVICE_UNAVAILABLE,
      details,
    })
  }
}
