import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class NotFoundException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.NOT_FOUND,
      message: message ?? HttpMessage.NOT_FOUND,
      details,
    })
  }
}
