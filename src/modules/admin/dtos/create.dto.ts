import { IsString, IsOptional, IsEnum, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateAdminRequest } from '../interfaces'
import { Role } from '@prisma/client'

export class CreateAdminDto implements CreateAdminRequest {
  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string

  @ApiProperty({ example: 'password123' })
  @MinLength(8)
  @IsString()
  password: string

  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsString()
  name: string

  @ApiPropertyOptional({ example: 'admin', enum: ['admin', 'superadmin'] })
  @IsEnum(Role)
  @IsString()
  @IsOptional()
  role: Role

  @ApiPropertyOptional({ example: '13' })
  @IsString()
  @IsOptional()
  region?: string

  @ApiPropertyOptional({ example: '123' })
  @IsString()
  @IsOptional()
  bhmCode?: string
}
