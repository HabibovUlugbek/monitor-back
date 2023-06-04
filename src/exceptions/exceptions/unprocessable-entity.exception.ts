import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class UnprocessableEntityException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: message ?? HttpMessage.UNPROCESSABLE_ENTITY,
      details,
    })
  }
}
