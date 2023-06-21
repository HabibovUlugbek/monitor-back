import type { ExceptionParams } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { HttpMessage } from '../enums'

export class ConflictDto implements Pick<ExceptionParams, 'message' | 'details'> {
  @ApiProperty({
    example: HttpMessage.CONFLICT,
  })
  message: string

  @ApiPropertyOptional()
  details?: unknown
}
