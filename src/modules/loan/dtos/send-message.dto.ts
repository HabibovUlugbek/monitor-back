import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class SendMessageRequestDto {
  @ApiProperty({
    example: 'Text message',
  })
  @IsString()
  message: string

  @ApiProperty({
    example: 'loan Id',
  })
  @IsUUID()
  loanId: string
}
