import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules'
import { LoanStatus, Role } from '@prisma/client'
import { NotFoundException } from '@exceptions'
import { AssignLoanRequest, GetLoanResponse, Loan, LoanStats } from './interfaces'
import { SendMessageRequestDto } from './dtos'
import { generatePdf } from '@helpers'

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

  async assignLoan(payload: AssignLoanRequest, adminId: string) {
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

    await this.prisma.loanHistory.updateMany({
      where: {
        loanId: payload.loanId,
        assigneeId: adminId,
        status: LoanStatus.PENDING,
      },
      data: {
        status: LoanStatus.APPROVED,
      },
    })

    await this.prisma.notification.create({
      data: {
        adminId: payload.userId,
        message: `Sizga yangi ${loan.externalId} raqamli kredit berildi`,
        loanId: payload.loanId,
      },
    })

    const checkerEmp = await this.prisma.admin.findFirst({
      where: {
        bhmCode: loan.bhmCode,
        region: loan.codeRegion,
        role: Role.REGION_CHECKER_EMPLOYEE,
      },
    })

    if (checkerEmp) {
      await this.prisma.notification.create({
        data: {
          adminId: checkerEmp.id,
          message: `Yangi ${loan.externalId} raqamli kredit monitoring uchun berildi`,
          loanId: payload.loanId,
        },
      })
    }

    const checkerBoss = await this.prisma.admin.findFirst({
      where: {
        region: loan.codeRegion,
        role: Role.REGION_CHECKER_BOSS,
      },
    })

    if (checkerBoss) {
      await this.prisma.notification.create({
        data: {
          adminId: checkerBoss.id,
          message: `Yangi ${loan.externalId} raqamli kredit monitoring uchun berildi`,
          loanId: payload.loanId,
        },
      })
    }
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

    const assignedAdmin = await this.prisma.admin.findFirst({
      where: {
        loanHistory: {
          some: {
            loanId: loanId,
          },
        },
      },
    })

    const checkerEmp = await this.prisma.admin.findFirst({
      where: {
        bhmCode: loan.bhmCode,
        region: loan.codeRegion,
        role: Role.REGION_CHECKER_EMPLOYEE,
      },
    })

    const checkerBoss = await this.prisma.admin.findFirst({
      where: {
        region: loan.codeRegion,
        role: Role.REGION_CHECKER_BOSS,
      },
    })

    const regionBoss = await this.prisma.admin.findFirst({
      where: {
        region: loan.codeRegion,
        role: Role.REGION_BOSS,
      },
    })

    switch (user.role) {
      case Role.REGION_CHECKER_BOSS:
        if (checkerEmp) {
          await this.prisma.notification.create({
            data: {
              adminId: checkerEmp.id,
              message: `Yangi ${loan.externalId} raqamli kredit monitoring tomonidan tasdiqlandi`,
              loanId,
            },
          })
        }

        if (regionBoss) {
          await this.prisma.notification.create({
            data: {
              adminId: regionBoss.id,
              message: `Yangi ${loan.externalId} raqamli kredit monitoring tomonidan tasdiqlandi`,
              loanId,
            },
          })
        }
        if (assignedAdmin) {
          await this.prisma.notification.create({
            data: {
              adminId: assignedAdmin.id,
              message: `Sizning ${loan.externalId} raqamli kreditingiz tasdiqlandi`,
              loanId,
            },
          })
        }
        break

      case Role.REGION_EMPLOYEE:
        if (checkerEmp) {
          await this.prisma.loanHistory.create({
            data: {
              assigneeId: checkerEmp.id,
              loanId,
              status: LoanStatus.PENDING,
            },
          })

          await this.prisma.notification.create({
            data: {
              adminId: checkerEmp.id,
              message: `Yangi ${loan.externalId} raqamli kredit tekshiruv uchun berildi`,
              loanId,
            },
          })
        }
        break
      case Role.REGION_CHECKER_EMPLOYEE:
        if (checkerBoss) {
          await this.prisma.loanHistory.create({
            data: {
              assigneeId: checkerBoss.id,
              loanId,
              status: LoanStatus.PENDING,
            },
          })

          await this.prisma.notification.create({
            data: {
              adminId: checkerBoss.id,
              message: `Yangi ${loan.externalId} raqamli kredit monitoring uchun berildi`,
              loanId,
            },
          })
        }

        if (assignedAdmin) {
          await this.prisma.notification.create({
            data: {
              adminId: assignedAdmin.id,
              message: `Sizning ${loan.externalId} raqamli kreditingiz tasdiqlandi`,
              loanId,
            },
          })
        }
        break
    }

    await this.prisma.loanHistory.updateMany({
      where: {
        assigneeId: userId,
        loanId,
        status: LoanStatus.PENDING,
      },
      data: {
        status: LoanStatus.APPROVED,
      },
    })
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

    const assignedAdmin = await this.prisma.admin.findFirst({
      where: {
        loanHistory: {
          some: {
            loanId: loanId,
          },
        },
      },
    })

    const checkerEmp = await this.prisma.admin.findFirst({
      where: {
        bhmCode: loan.bhmCode,
        region: loan.codeRegion,
        role: Role.REGION_CHECKER_EMPLOYEE,
      },
    })

    const regionBoss = await this.prisma.admin.findFirst({
      where: {
        region: loan.codeRegion,
        role: Role.REGION_BOSS,
      },
    })

    switch (user.role) {
      case Role.REGION_CHECKER_BOSS:
        if (checkerEmp) {
          await this.prisma.notification.create({
            data: {
              adminId: checkerEmp.id,
              message: `Yangi ${loan.externalId} raqamli kredit monitoring tomonidan rad etildi`,
              loanId,
            },
          })
        }

        if (regionBoss) {
          await this.prisma.notification.create({
            data: {
              adminId: regionBoss.id,
              message: `Yangi ${loan.externalId} raqamli kredit monitoring tomonidan rad etildi`,
              loanId,
            },
          })
        }
        if (assignedAdmin) {
          await this.prisma.notification.create({
            data: {
              adminId: assignedAdmin.id,
              message: `Sizning ${loan.externalId} raqamli kreditingiz rad etildi`,
              loanId,
            },
          })
        }
        break
      case Role.REGION_CHECKER_EMPLOYEE:
        if (regionBoss) {
          await this.prisma.notification.create({
            data: {
              adminId: regionBoss.id,
              message: `Yangi ${loan.externalId} raqamli kredit monitoring tomonidan rad etildi`,
              loanId,
            },
          })
        }

        if (assignedAdmin) {
          await this.prisma.notification.create({
            data: {
              adminId: assignedAdmin.id,
              message: `Sizning ${loan.externalId} raqamli kreditingiz rad etildi`,
              loanId,
            },
          })
        }
        break
    }

    await this.prisma.loanHistory.updateMany({
      where: {
        assigneeId: userId,
        loanId,
        status: LoanStatus.PENDING,
      },
      data: {
        status: LoanStatus.REJECTED,
      },
    })

    await this.prisma.loanHistory.create({
      data: {
        assigneeId: assignedAdmin.id,
        loanId,
        status: LoanStatus.PENDING,
      },
    })

    await this.prisma.notification.create({
      data: {
        adminId: assignedAdmin.id,
        message: `Sizning ${loan.externalId} raqamli kreditingiz rad etildi`,
        loanId,
      },
    })
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

  async getLoanStats(): Promise<LoanStats[]> {
    const loans = await this.prisma.loan.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
      include: {
        history: {
          orderBy: {
            date: 'desc',
          },
          take: 1,
        },
      },
    })

    const result: {
      [key: string]: {
        inProcess: number
        rejected: number
        outdated: number
        approved: number
      }
    } = {}

    loans.forEach((loan) => {
      const latestHistory = loan.history[0]
      let regionResult = result[loan.codeRegion]
      if (!regionResult) {
        regionResult = {
          inProcess: 0,
          rejected: 0,
          outdated: 0,
          approved: 0,
        }
      }
      if (latestHistory) {
        switch (latestHistory.status) {
          case LoanStatus.PENDING:
            regionResult.inProcess++
            break
          case LoanStatus.REJECTED:
            regionResult.rejected++
            break
          case LoanStatus.APPROVED:
            regionResult.approved++
            break
          case LoanStatus.OUTDATED:
            regionResult.outdated++
            break
          default:
            break
        }
      }

      result[loan.codeRegion] = regionResult
    })

    const statistics: LoanStats[] = []
    Object.entries(result).forEach(([region, stats]) => {
      statistics.push({
        region,
        ...stats,
      })
    })

    return statistics
  }

  async uploadInfo(
    loanId: string,
    filePath: string,
    userId: string,
    data?: { name: string; pages: string; comment: string },
  ) {
    await this.prisma.message.create({
      data: {
        adminId: userId,
        message: `File uploaded: ${filePath}`,
        loanId: loanId,
      },
    })

    if (data && data?.pages && data.comment) {
      await this.prisma.file.create({
        data: {
          name: data.name,
          pages: data.pages,
          adminId: userId,
          loanId,
          path: `${filePath}`,
          comment: data.comment,
        },
      })
    }
  }

  async getLoanFiles(loanId: string) {
    return this.prisma.file.findMany({
      where: {
        loanId,
      },
      include: {
        admin: true,
        loan: true,
      },
    })
  }

  async sendMessage(userId: string, payload: SendMessageRequestDto) {
    await this.prisma.message.create({
      data: {
        adminId: userId,
        message: payload.message,
        loanId: payload.loanId,
      },
    })
  }

  async genereatePDF(loanId: string): Promise<Buffer> {
    console.log('here')
    const data = await this.prisma.file.findMany({
      where: {
        loanId,
      },
      include: {
        admin: true,
        loan: true,
      },
    })

    return generatePdf(loanId, data)
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
