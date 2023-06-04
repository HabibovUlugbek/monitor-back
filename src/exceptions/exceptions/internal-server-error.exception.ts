import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class InternalServerErrorException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message ?? HttpMessage.INTERNAL_SERVER_ERROR,
      details,
    })
  }
}
