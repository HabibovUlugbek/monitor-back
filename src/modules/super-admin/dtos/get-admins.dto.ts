import { Role } from '@prisma/client'
import { AdminResponse } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class AdminResponseDto implements AdminResponse {
  @ApiProperty({
    example: 'ad4b3b3b-1b7b-4b6b-8b3b-1b7b4b6b8b3b',
  })
  id: string

  @ApiProperty({
    example: 'homer.simpson',
  })
  username: string

  @ApiProperty({
    example: 'Homer Simpson',
  })
  name: string

  @ApiProperty({
    example: '26',
  })
  region?: string

  @ApiProperty({
    example: 'REGION_EMPLOYEE',
  })
  role: Role
}
