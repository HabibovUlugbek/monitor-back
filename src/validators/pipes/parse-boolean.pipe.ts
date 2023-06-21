import type { ParseBoolPipeOptions } from '@nestjs/common'
import { Injectable, HttpStatus, ParseBoolPipe } from '@nestjs/common'
import { BadRequestException } from '@exceptions'

@Injectable()
export class ParseBooleanPipe extends ParseBoolPipe {
  constructor(options?: ParseBoolPipeOptions) {
    super({
      exceptionFactory: (): BadRequestException => new BadRequestException('The value is not a valid boolean type.'),
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      ...options,
    })
  }
}
