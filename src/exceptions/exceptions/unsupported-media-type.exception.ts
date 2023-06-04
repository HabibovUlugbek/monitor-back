import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class UnsupportedMediaTypeException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      message: message ?? HttpMessage.UNSUPPORTED_MEDIA_TYPE,
      details,
    })
  }
}
