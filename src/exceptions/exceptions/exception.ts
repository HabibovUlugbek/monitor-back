import { HttpStatus } from '../enums'
import type { ExceptionParams } from '../interfaces'

export class Exception extends Error {
  readonly #_status: HttpStatus
  readonly #_message: string
  readonly #_details: unknown
  readonly #_exception: string

  constructor(params: ExceptionParams) {
    super(params.message)

    this.#_status = params.status
    this.#_message = params.message
    this.#_details = params.details
    this.#_exception = params.exception ?? this.constructor.name
  }

  getStatus(): HttpStatus {
    return this.#_status
  }

  getMessage(): string {
    return this.#_message
  }

  getDetails(): unknown {
    return this.#_details
  }

  getException(): string {
    return this.#_exception
  }
}
