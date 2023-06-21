import type { ParseUUIDPipeOptions } from '@nestjs/common'
import { Injectable, HttpStatus, ParseUUIDPipe as BaseParseUUIDPipe } from '@nestjs/common'
import { BadRequestException } from '@exceptions'

@Injectable()
export class ParseUUIDPipe extends BaseParseUUIDPipe {
  constructor(options?: ParseUUIDPipeOptions) {
    const details: Record<string, string> = {
      '3': 'The value is not a valid UUID v3.',
      '4': 'The value is not a valid UUID v4.',
      '5': 'The value is not a valid UUID v5.',
    }

    super({
      exceptionFactory: (): BadRequestException =>
        new BadRequestException(details[options?.version] ?? 'The value is not a valid UUID.'),
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      ...options,
    })
  }
}
