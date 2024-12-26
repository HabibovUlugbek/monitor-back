import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules'
import { LoanStatus, Role } from '@prisma/client'
import { NotFoundException } from '@exceptions'

@Injectable()
export class LoanService {
  constructor(private readonly prisma: PrismaService) {}

  async getLoans(payload: { userId: string }): Promise<any[]> {
    const user = await this.prisma.admin.findFirst({
      where: {
        id: payload.userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    // if (user.role === Role.REGION_EMPLOYEE) {
    //   return this.getLoansForRegionEmployee(payload)
    // } else if (user.role === Role.REGION_BOSS) {
    //   return this.getLoansForRegionBoss(payload)
    // } else if (user.role === Role.REGION_CHECKER_EMPLOYEE) {
    //   return this.getLoansForMonitoringBoss(payload)
    // } else if (user.role === Role.REGION_CHECKER_BOSS) {
    //   return this.getLoansForMonitoringBoss(payload)
    // } else {
    //   return this.getLoansForRepublic()
    // }

    return []
  }

  async assignLoan(payload: { userId: string; loanId: string }) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: payload.loanId,
      },
    })

    if (!loan) {
      throw new NotFoundException('Loan not found')
    }

    const user = await this.prisma.admin.findFirst({
      where: {
        id: payload.userId,
        role: Role.REGION_EMPLOYEE,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const existingLoanHistory = await this.prisma.loanHistory.findFirst({
      where: {
        assigneeId: payload.userId,
        loanId: payload.loanId,
      },
    })

    if (existingLoanHistory) {
      return existingLoanHistory
    }

    const loanHistory = await this.prisma.loanHistory.create({
      data: {
        assigneeId: payload.userId,
        loanId: payload.loanId,
        status: LoanStatus.PENDING,
      },
    })

    return loanHistory
  }

  async uploadLoanInfo(payload: { loanId: string; status: LoanStatus; userId: string }) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: payload.loanId,
      },
    })

    if (!loan) {
      throw new NotFoundException('Loan not found')
    }

    const loanHistory = await this.prisma.loanHistory.findFirst({
      where: {
        loanId: payload.loanId,
        assigneeId: payload.userId,
        status: LoanStatus.PENDING,
      },
    })

    if (!loanHistory) {
      throw new NotFoundException('Loan history not found')
    }

    await this.prisma.loanHistory.update({
      where: {
        id: loanHistory.id,
      },
      data: {
        status: payload.status,
      },
    })

    // create notifications for monotoring boshliq

    return loanHistory
  }
}
