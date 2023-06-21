import type { ExceptionParams } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'
import { HttpMessage } from '../enums'

export class InternalServerErrorDto implements Pick<ExceptionParams, 'message'> {
  @ApiProperty({
    example: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  message: string
}
