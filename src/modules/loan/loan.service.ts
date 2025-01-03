import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules'
import { LoanStatus, Role } from '@prisma/client'
import { NotFoundException } from '@exceptions'
import { AssignLoanRequest, GetLoanResponse, Loan } from './interfaces'

@Injectable()
export class LoanService {
  constructor(private readonly prisma: PrismaService) {}

  async getLoans(userId: string): Promise<Loan[]> {
    const user = await this.prisma.admin.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.role === Role.REGION_EMPLOYEE) {
      return this.#_getLoansForRegionEmployee(userId)
    } else if (user.role === Role.REGION_BOSS) {
      return this.#_getLoansForRegionBoss(user.region)
    } else if (user.role === Role.REGION_CHECKER_BOSS) {
      return this.#_getLoansForMonitoringBoss(user.region)
    } else if (user.role === Role.REGION_CHECKER_EMPLOYEE) {
      return this.#_getLoansForMonitoringEmployee(user.bhmCode)
    } else {
      return this.#_getLoansForRepublic()
    }
  }

  async assignLoan(payload: AssignLoanRequest) {
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

    await this.prisma.loanHistory.create({
      data: {
        assigneeId: payload.userId,
        loanId: payload.loanId,
        status: LoanStatus.PENDING,
      },
    })

    await this.prisma.notification.create({
      data: {
        adminId: payload.userId,
        message: `Sizga yangi ${payload.loanId} raqamli kredit berildi`,
        loanId: payload.loanId,
      },
    })

    // create notifications for monitoring boshliq
  }

  async approveLoan(loanId: string, userId: string) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: loanId,
        history: {
          some: {
            assigneeId: userId,
            status: LoanStatus.PENDING,
          },
        },
      },
    })

    if (!loan) {
      throw new NotFoundException('Loan not found')
    }

    const user = await this.prisma.admin.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.prisma.loanHistory.create({
      data: {
        assigneeId: userId,
        loanId,
        status: LoanStatus.APPROVED,
      },
    })

    await this.prisma.notification.create({
      data: {
        adminId: userId,
        message: `Sizning ${loanId} raqamli kreditingiz tasdiqlandi`,
        loanId,
      },
    })

    // create notifications for monitoring boshliq
  }

  async rejectLoan(loanId: string, userId: string) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: loanId,
        history: {
          some: {
            assigneeId: userId,
            status: LoanStatus.PENDING,
          },
        },
      },
    })

    if (!loan) {
      throw new NotFoundException('Loan not found')
    }

    const user = await this.prisma.admin.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.prisma.loanHistory.create({
      data: {
        assigneeId: userId,
        loanId,
        status: LoanStatus.REJECTED,
      },
    })

    await this.prisma.notification.create({
      data: {
        adminId: userId,
        message: `Sizning ${loanId} raqamli kreditingiz rad etildi`,
        loanId,
      },
    })

    // create notifications for monitoring boshliq
  }

  async getLoan(id: string): Promise<GetLoanResponse> {
    return this.prisma.loan.findFirst({
      where: {
        id,
      },
      include: {
        history: {
          select: {
            id: true,
            status: true,
            date: true,
            assignee: true,
          },
        },
        messages: {
          select: {
            id: true,
            admin: true,
            message: true,
            createdAt: true,
          },
        },
      },
    })
  }

  async #_getLoansForRegionEmployee(userId: string): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      where: {
        history: {
          some: {
            assigneeId: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        history: {
          where: {
            status: LoanStatus.PENDING,
          },
          include: {
            assignee: true,
          },
        },
      },
    })
  }

  async #_getLoansForRegionBoss(regionCode: string) {
    return this.prisma.loan.findMany({
      where: {
        codeRegion: regionCode,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        history: {
          where: {
            status: LoanStatus.PENDING,
          },
          include: {
            assignee: true,
          },
        },
      },
    })
  }

  async #_getLoansForRepublic() {
    return this.prisma.loan.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      include: {
        history: {
          where: {
            status: LoanStatus.PENDING,
          },
          include: {
            assignee: true,
          },
        },
      },
    })
  }

  async #_getLoansForMonitoringBoss(region: string) {
    return this.prisma.loan.findMany({
      where: {
        codeRegion: region,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        history: {
          where: {
            status: LoanStatus.PENDING,
          },
          include: {
            assignee: true,
          },
        },
      },
    })
  }

  async #_getLoansForMonitoringEmployee(bhmCode: string) {
    return this.prisma.loan.findMany({
      where: {
        bhmCode,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        history: {
          where: {
            status: LoanStatus.PENDING,
          },
          include: {
            assignee: true,
          },
        },
      },
    })
  }
}
