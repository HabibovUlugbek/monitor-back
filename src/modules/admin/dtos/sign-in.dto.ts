import { ApiProperty } from '@nestjs/swagger'
import type { SignInRequest, SignInResponse } from '../interfaces'
import { IsString, IsNotEmpty } from 'class-validator'

export class SignInRequestDto implements SignInRequest {
  @ApiProperty({
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string
}

export class SignInResponseDto implements SignInResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonly accessToken: string

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonly refreshToken: string
}
