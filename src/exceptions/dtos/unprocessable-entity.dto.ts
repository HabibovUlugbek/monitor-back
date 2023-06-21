import type { ExceptionParams } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { HttpMessage } from '../enums'

export class UnprocessableEntityDto implements Pick<ExceptionParams, 'message' | 'details'> {
  @ApiProperty({
    example: HttpMessage.UNPROCESSABLE_ENTITY,
  })
  message: string

  @ApiPropertyOptional()
  details?: unknown
}
