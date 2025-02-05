import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { LoanStatus, Role } from '@prisma/client'
import { PrismaService } from 'modules/prisma'

@Injectable()
export class CheckAssignService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_WEEKDAY)
  async checkAssign() {
    Logger.log('Checking loans for assigned or not', 'LoanCron')

    const regionBosses = await this.prisma.admin.findMany({
      where: { role: Role.REGION_BOSS },
    })
    const yesterday = new Date()
    const day = yesterday.getDay()

    if (day === 0) {
      yesterday.setDate(yesterday.getDate() - 2) // Go back to Friday
    } else if (day === 1) {
      yesterday.setDate(yesterday.getDate() - 3) // Go back to Friday
    } else {
      yesterday.setDate(yesterday.getDate() - 1) // Go back one day
    }

    regionBosses.forEach(async (boss) => {
      const loans = await this.prisma.loan.findMany({
        where: {
          history: {
            some: {
              assigneeId: boss.id,
              status: LoanStatus.PENDING,
            },
          },
          createdAt: {
            gte: new Date(yesterday.setHours(0, 0, 0, 0)),
            lt: new Date(yesterday.setHours(23, 59, 59, 999)),
          },
          codeRegion: boss.region,
        },
      })

      const republicEmployee = await this.prisma.admin.findFirst({
        where: { role: Role.REPUBLIC_EMPLOYEE, region: boss.region },
      })

      loans.forEach(async (loan) => {
        if (!republicEmployee) {
          Logger.error(`Republic employee not found for ${boss.username}`, 'LoanCron')
          return
        }

        await this.prisma.loanHistory.updateMany({
          where: { loanId: loan.id, status: LoanStatus.PENDING, assigneeId: boss.id },
          data: { status: LoanStatus.OUTDATED },
        })

        await this.prisma.notification.create({
          data: {
            message: `${loan.externalId} raqamli kredit bo'lib berilmadi`,
            adminId: republicEmployee.id,
            loanId: loan.id,
          },
        })
      })

      Logger.log(`Found ${loans.length} loans for ${boss.username}`, 'LoanCron')
    })
  }
}
