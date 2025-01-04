export interface Loan {
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
}
