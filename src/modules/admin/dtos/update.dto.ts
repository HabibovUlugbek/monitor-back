import { IsString, IsOptional, IsEnum } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { UpdateAdminRequest } from '../interfaces'
import { Role } from '@prisma/client'

export class UpdateAdminDto implements UpdateAdminRequest {
  @ApiPropertyOptional({ example: 'admin' })
  @IsString()
  @IsOptional()
  username: string

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @IsOptional()
  name: string

  @ApiPropertyOptional({ example: 'admin', enum: ['admin', 'superadmin'] })
  @IsEnum(Role)
  @IsString()
  @IsOptional()
  role?: string

  @ApiPropertyOptional({ example: '13' })
  @IsString()
  @IsOptional()
  region?: string

  @ApiPropertyOptional({ example: '123' })
  @IsString()
  @IsOptional()
  bhmCode?: string
}
