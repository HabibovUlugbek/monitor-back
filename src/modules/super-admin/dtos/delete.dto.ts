import { ApiProperty } from '@nestjs/swagger'
import { DeleteRequest } from '../interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteRequestDto implements DeleteRequest {
  @ApiProperty({
    example: 'user123',
    description: 'The username of the super admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: 'password123',
    description: 'The password of the super admin',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
