import { ApiProperty } from '@nestjs/swagger'
import { LoanStatus, Role } from '@prisma/client'
import { GetLoanResponse, LoanHistory, Admin, Message } from '../interfaces'

export class AdminDto implements Admin {
  @ApiProperty({ example: '123' })
  id: string

  @ApiProperty({ example: 'admin_user' })
  username: string

  @ApiProperty({ example: 'Admin Name' })
  name: string

  @ApiProperty({ example: '13', required: false })
  region?: string

  @ApiProperty({ example: Role.REGION_EMPLOYEE })
  role: Role
}

export class LoanHistoryDto implements LoanHistory {
  @ApiProperty({ example: '123' })
  id: string

  @ApiProperty({ type: AdminDto })
  assignee: AdminDto

  @ApiProperty({ example: LoanStatus.APPROVED })
  status: LoanStatus

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  date: Date
}

export class MessageDto implements Message {
  @ApiProperty({ example: '123' })
  id: string

  @ApiProperty({ type: AdminDto })
  admin: AdminDto

  @ApiProperty({ example: 'Your loan has been approved.' })
  message: string

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date
}

export class GetLoanResponseDto implements GetLoanResponse {
  @ApiProperty({ example: '12345' })
  id: string

  @ApiProperty({ example: '01' })
  codeRegion: string

  @ApiProperty({ example: 'John Doe' })
  borrower: string

  @ApiProperty({ example: 'LN12345', required: false })
  loanNumber?: string

  @ApiProperty({ example: 'VAL123' })
  codeVal: string

  @ApiProperty({ example: 1000 })
  amount: number

  @ApiProperty({ example: 500 })
  remaining: number

  @ApiProperty({ example: 'DOC12345' })
  docNumber: string

  @ApiProperty({ example: 'Individual' })
  clientType: string

  @ApiProperty({ example: '1234567890' })
  inn: string

  @ApiProperty({ example: 'C12345' })
  clientCode: string

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  issuedAt: Date

  @ApiProperty({ example: '2023-12-31T00:00:00.000Z' })
  dueDate: Date

  @ApiProperty({ example: true })
  returned: boolean

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ type: [LoanHistoryDto] })
  history: LoanHistoryDto[]

  @ApiProperty({ type: [MessageDto] })
  messages: MessageDto[]
}
