import { Loan } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class GetLoansDto implements Loan {
  @ApiProperty({ example: 'BHM123' })
  bhmCode: string

  @ApiProperty({ example: 'EXT123456' })
  externalId: string
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

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  issuedAt: Date

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date
}
