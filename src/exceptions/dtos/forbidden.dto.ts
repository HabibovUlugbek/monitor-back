import type { ExceptionParams } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { HttpMessage } from '../enums'

export class ForbiddenDto implements Pick<ExceptionParams, 'message' | 'details'> {
  @ApiProperty({
    example: HttpMessage.FORBIDDEN,
  })
  message: string

  @ApiPropertyOptional()
  details?: unknown
}
