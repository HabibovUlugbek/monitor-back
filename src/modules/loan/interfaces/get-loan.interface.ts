import { LoanStatus, Role } from '@prisma/client'

export interface GetLoanResponse {
  id: string
  codeRegion: string
  borrower: string
  loanNumber?: string
  codeVal: string
  amount: number
  remaining: number
  issuedAt: Date
  createdAt: Date
  bhmCode: string
  externalId: string
  contractAmountEquvivalent?: number
  inspector?: string
  totalDebt?: number
  history: LoanHistory[]
  messages: Message[]
}

export interface LoanHistory {
  id: string
  assignee: Admin
  status: LoanStatus
  date: Date
}

export interface Admin {
  id: string
  username: string
  name: string
  region?: string
  role: Role
}

export interface Message {
  id: string
  admin: Admin
  message: string
  createdAt: Date
}
