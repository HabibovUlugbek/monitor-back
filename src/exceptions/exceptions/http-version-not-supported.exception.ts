import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class HttpVersionNotSupportedException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
      message: message ?? HttpMessage.HTTP_VERSION_NOT_SUPPORTED,
      details,
    })
  }
}
