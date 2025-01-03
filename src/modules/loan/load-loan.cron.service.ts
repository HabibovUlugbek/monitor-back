import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { LoanStatus, Role } from '@prisma/client'
import { PrismaService } from 'modules/prisma'
import { mockData } from './mock-loan'

@Injectable()
export class LoadLoanService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_WEEKDAY)
  async loadLoan() {
    Logger.log('Loading loan data...', 'LoanCron')

    const regionBosses = await this.prisma.admin.findMany({
      where: { role: Role.REGION_BOSS },
    })

    mockData.forEach(async (loan) => {
      let regionBossId
      regionBosses.forEach((boss) => {
        if (boss.region === loan.codeRegion) {
          regionBossId = boss.id
        }
      })

      if (!regionBossId) {
        Logger.error(`Region boss not found for region ${loan.codeRegion}`)
        if (!regionBossId) return
      }
      const { id: loanId } = await this.prisma.loan.create({
        data: {
          ...loan,
          history: {
            create: {
              assigneeId: regionBossId,
              status: LoanStatus.PENDING,
            },
          },
        },
        select: { id: true },
      })
      const checker = await this.prisma.admin.findFirst({
        where: {
          region: loan.codeRegion,
          bhmCode: loan.bhmCode,
        },
      })

      await this.prisma.notification.create({
        data: {
          message: `Sizga ${loanId} raqamli kredit bo'lib berish uchun berildi`,
          adminId: regionBossId,
          loanId,
        },
      })

      await await this.prisma.notification.create({
        data: {
          message: `Sizga ${loanId} raqamli kredit tekshirish uchun berildi`,
          adminId: checker.id,
          loanId,
        },
      })
    })

    Logger.log(mockData.length, ' loans loaded')
  }
}
