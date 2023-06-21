import type { ParseIntPipeOptions } from '@nestjs/common'
import { Injectable, HttpStatus, ParseIntPipe } from '@nestjs/common'
import { BadRequestException } from '@exceptions'

@Injectable()
export class ParseIntegerPipe extends ParseIntPipe {
  constructor(options?: ParseIntPipeOptions) {
    super({
      exceptionFactory: (): BadRequestException => new BadRequestException('The value is not a valid integer type.'),
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      ...options,
    })
  }
}
