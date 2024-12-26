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

      await this.prisma.notification.create({
        data: {
          message: `Sizga ${loanId} raqamli kredit bo'lib berish uchun berildi`,
          adminId: regionBossId,
          loanId,
        },
      })
    })

    Logger.log(mockData.length, ' loans loaded')
  }
}
