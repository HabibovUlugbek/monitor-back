import { HttpStatus } from '../enums'

export declare interface ExceptionParams {
  status: HttpStatus
  message: string
  details?: unknown
  exception?: string
}
