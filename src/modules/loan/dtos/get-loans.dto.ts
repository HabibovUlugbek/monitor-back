import { Loan } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class GetLoansDto implements Loan {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string

  @ApiProperty({ example: '13' })
  codeRegion: string

  @ApiProperty({ example: 'John Doe' })
  borrower: string

  @ApiProperty({ example: 'LN123456' })
  loanNumber?: string

  @ApiProperty({ example: 'VAL123' })
  codeVal: string

  @ApiProperty({ example: 10000 })
  amount: number

  @ApiProperty({ example: 5000 })
  remaining: number

  @ApiProperty({ example: 'DOC123456' })
  docNumber: string

  @ApiProperty({ example: 'Individual' })
  clientType: string

  @ApiProperty({ example: '1234567890' })
  inn: string

  @ApiProperty({ example: 'C123456' })
  clientCode: string

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  issuedAt: Date

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  dueDate: Date

  @ApiProperty({ example: true })
  returned: boolean

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date
}
