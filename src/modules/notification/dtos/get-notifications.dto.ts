import { NotificationInterface } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class GetNotificationsDto implements NotificationInterface {
  @ApiProperty({
    example: '123456',
  })
  id: string

  @ApiProperty({
    example: 'You have a new message from John Doe',
  })
  message: string

  @ApiProperty({
    example: false,
  })
  read: boolean

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
  })
  createdAt: Date

  @ApiProperty({
    example: 'ad4b3b3b-1b7b-4b6b-8b3b-1b7b4b6b8b3b',
  })
  adminId: string

  @ApiProperty({
    example: 'ad4b3b3b-1b7b-4b6b-8b3b-1b7b4b6b8b3b',
  })
  loanId: string
}
