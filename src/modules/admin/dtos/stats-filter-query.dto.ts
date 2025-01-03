import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDate, IsOptional, IsString } from 'class-validator'
import { StatsFilterQuery, StatsResponse, TaskStats } from '../interfaces'

export class StatsFilterQueryDto implements StatsFilterQuery {
  @ApiPropertyOptional({ example: '2021-01-01' })
  @IsDate()
  @IsOptional()
  startDate?: Date

  @ApiPropertyOptional({ example: '2021-01-31' })
  @IsDate()
  @IsOptional()
  endDate?: Date

  @ApiPropertyOptional({ example: '03' })
  @IsString()
  @IsOptional()
  region?: string
}

export class TaskStatsDto implements TaskStats {
  @ApiPropertyOptional({ example: 3 })
  inProcess: number

  @ApiPropertyOptional({ example: 1 })
  rejected: number

  @ApiPropertyOptional({ example: 0 })
  outdated: number

  @ApiPropertyOptional({ example: 2 })
  approved: number
}

export class StatsResponseDto implements StatsResponse {
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string

  @ApiPropertyOptional({ example: 'John Doe' })
  name: string

  @ApiPropertyOptional({ example: 'johndoe' })
  username: string

  @ApiPropertyOptional({ example: 'republic_boss' })
  role: string

  @ApiPropertyOptional({ example: '03' })
  region: string

  @ApiPropertyOptional({
    type: TaskStatsDto,
  })
  stats: TaskStats
}
