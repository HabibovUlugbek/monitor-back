import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class UnauthorizedException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: message ?? HttpMessage.UNAUTHORIZED,
      details,
    })
  }
}
