import type { ValidationError, ValidationPipeOptions } from '@nestjs/common'
import { Injectable, HttpStatus, ValidationPipe as BaseValidationPipe } from '@nestjs/common'
import { UnprocessableEntityException } from '@exceptions'

@Injectable()
export class ValidationPipe extends BaseValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      exceptionFactory: (errors: ValidationError[]): UnprocessableEntityException => {
        const details: Record<string, string[]> = {}

        errors.forEach((error: ValidationError): void => {
          if (error.constraints) {
            details[error.property] = Object.values(error.constraints)
          }
        })

        return new UnprocessableEntityException(details)
      },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      ...options,
    })
  }
}
