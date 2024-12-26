export interface Loan {
  id: string
  codeRegion: string
  borrower: string
  loanNumber?: string
  codeVal: string
  amount: number
  remaining: number
  docNumber: string
  clientType: string
  inn: string
  clientCode: string
  issuedAt: Date
  dueDate: Date
  returned: boolean
  createdAt: Date
}
