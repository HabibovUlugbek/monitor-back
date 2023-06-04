import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class BadGatewayException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.BAD_GATEWAY,
      message: message ?? HttpMessage.BAD_GATEWAY,
      details,
    })
  }
}
