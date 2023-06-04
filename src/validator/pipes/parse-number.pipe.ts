import type { ParseFloatPipeOptions } from '@nestjs/common'
import { Injectable, HttpStatus, ParseFloatPipe } from '@nestjs/common'
import { BadRequestException } from '@exceptions'

@Injectable()
export class ParseNumberPipe extends ParseFloatPipe {
  constructor(options?: ParseFloatPipeOptions) {
    super({
      exceptionFactory: (): BadRequestException => new BadRequestException('The value is not a number.'),
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      ...options,
    })
  }
}
