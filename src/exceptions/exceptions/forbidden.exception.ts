import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class ForbiddenException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.FORBIDDEN,
      message: message ?? HttpMessage.FORBIDDEN,
      details,
    })
  }
}
