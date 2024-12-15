import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { RefreshTokenRequest, RefreshTokenResponse } from '../interfaces/refresh-token.interfaces'

export class RefreshTokenRequestDto implements RefreshTokenRequest {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}

export class RefreshTokenResponseDto implements RefreshTokenResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refreshToken: string
}
