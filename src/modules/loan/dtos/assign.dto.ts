import { IsNotEmpty, IsUUID } from 'class-validator'
import { AssignLoanRequest } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class AssignLoanRequestDto implements AssignLoanRequest {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  loanId: string
}
