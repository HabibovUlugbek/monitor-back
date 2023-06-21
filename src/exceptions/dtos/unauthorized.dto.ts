import type { ExceptionParams } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { HttpMessage } from '../enums'

export class UnauthorizedDto implements Pick<ExceptionParams, 'message' | 'details'> {
  @ApiProperty({
    example: HttpMessage.UNAUTHORIZED,
  })
  message: string

  @ApiPropertyOptional()
  details?: unknown
}
