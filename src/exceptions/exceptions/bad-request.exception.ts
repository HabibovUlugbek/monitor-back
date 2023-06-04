import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class BadRequestException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.BAD_REQUEST,
      message: message ?? HttpMessage.BAD_REQUEST,
      details,
    })
  }
}
