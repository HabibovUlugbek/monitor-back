import { IsString, IsOptional, IsEnum } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { CreateAdminRequest } from '../interfaces'
import { Role } from '@prisma/client'

export class UpdateAdminDto implements CreateAdminRequest {
  @ApiPropertyOptional({ example: 'admin' })
  @IsString()
  @IsOptional()
  username: string

  @ApiPropertyOptional({ example: 'password123' })
  @IsString()
  @IsOptional()
  password: string

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @IsOptional()
  name: string

  @ApiPropertyOptional({ example: 'admin', enum: ['admin', 'superadmin'] })
  @IsEnum(Role)
  @IsString()
  @IsOptional()
  role: string

  @ApiPropertyOptional({ example: '13' })
  @IsString()
  @IsOptional()
  region?: string
}
