import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class ImATeapotException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.IM_A_TEAPOT,
      message: message ?? HttpMessage.IM_A_TEAPOT,
      details,
    })
  }
}
