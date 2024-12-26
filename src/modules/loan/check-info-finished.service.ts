import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { LoanStatus, Role } from '@prisma/client'
import { PrismaService } from 'modules/prisma'

@Injectable()
export class ChecInfoService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_WEEKDAY)
  async checInfo() {
    Logger.log('Checking for assigned loans finished or not', 'LoanCron')

    const threeWorkingDaysAgo = this.getThreeWorkingDaysAgo()

    const loans = await this.prisma.loan.findMany({
      where: {
        history: {
          some: {
            status: LoanStatus.PENDING,
            assignee: {
              role: Role.REGION_EMPLOYEE,
            },
            date: {
              lte: threeWorkingDaysAgo,
            },
          },
        },
      },
    })

    loans.forEach(async (loan) => {
      await this.prisma.loanHistory.updateMany({
        where: {
          loanId: loan.id,
          status: LoanStatus.PENDING,
        },
        data: {
          status: LoanStatus.OUTDATED,
        },
      })

      //   await this.prisma.notification.create({
      //     data: {
      //       message: `Loan ${loan.id} has been expired`,
      //       adminId: loan.history[0].assigneeId,
      //       loanId: loan.id,
      //     },
      //   })
    })

    Logger.log(`Found ${loans.length} loans that meet the criteria.`, 'LoanCron')
  }

  private getThreeWorkingDaysAgo(): Date {
    const currentDate = new Date()
    let daysToSubtract = 3

    while (daysToSubtract > 0) {
      currentDate.setDate(currentDate.getDate() - 1)

      const dayOfWeek = currentDate.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        daysToSubtract--
      }
    }

    return currentDate
  }
}
