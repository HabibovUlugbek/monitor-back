import type { ExceptionParams } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { HttpMessage } from '../enums'

export class NotFoundDto implements Pick<ExceptionParams, 'message' | 'details'> {
  @ApiProperty({
    example: HttpMessage.NOT_FOUND,
  })
  message: string

  @ApiPropertyOptional()
  details?: unknown
}
