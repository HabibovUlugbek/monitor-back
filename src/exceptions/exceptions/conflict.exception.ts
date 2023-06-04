import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class ConflictException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.CONFLICT,
      message: message ?? HttpMessage.CONFLICT,
      details,
    })
  }
}
