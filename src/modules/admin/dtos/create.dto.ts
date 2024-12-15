import { IsString, IsEmail, IsOptional, IsIn, IsEnum } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateAdminRequest } from '../interfaces'
import { Role } from '@prisma/client'

export class CreateAdminDto implements CreateAdminRequest {
  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string

  @ApiProperty({ example: 'password123' })
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
  role: string

  @ApiPropertyOptional({ example: '13' })
  @IsString()
  @IsOptional()
  region?: string
}
