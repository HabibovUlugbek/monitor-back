import { Exception } from './exception'
import { HttpStatus, HttpMessage } from '../enums'

export class PaymentRequiredException extends Exception {
  constructor(details?: unknown, message?: string) {
    super({
      status: HttpStatus.PAYMENT_REQUIRED,
      message: message ?? HttpMessage.PAYMENT_REQUIRED,
      details,
    })
  }
}
