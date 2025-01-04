import { ApiProperty } from '@nestjs/swagger'
import { LoanStats } from '../interfaces'

export class LoanStatsDto implements LoanStats {
  @ApiProperty({ example: '03' })
  region: string

  @ApiProperty({ example: 3 })
  inProcess: number

  @ApiProperty({ example: 1 })
  rejected: number

  @ApiProperty({ example: 0 })
  outdated: number

  @ApiProperty({ example: 2 })
  approved: number
}
