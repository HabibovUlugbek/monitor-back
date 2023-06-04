import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class MethodNotAllowedException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.METHOD_NOT_ALLOWED,
      message: message ?? HttpMessage.METHOD_NOT_ALLOWED,
      details,
    })
  }
}
