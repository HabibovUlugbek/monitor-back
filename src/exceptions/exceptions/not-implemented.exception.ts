import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class NotImplementedException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.NOT_IMPLEMENTED,
      message: message ?? HttpMessage.NOT_IMPLEMENTED,
      details,
    })
  }
}
