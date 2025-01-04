import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { LoanStatus, Role } from '@prisma/client'
import { PrismaService } from 'modules/prisma'
import { mockData } from './mock-loan'
import { Client } from 'pg'

@Injectable()
export class LoadLoanService {
  private client: Client
  constructor(private readonly prisma: PrismaService) {
    this.client = new Client({
      connectionString: process.env.DB_URL,
    })

    this.client.connect()
  }

  async fetchData(query: string, params: any[] = []) {
    const result = await this.client.query(query, params)
    return result.rows
  }

  async closeConnection() {
    await this.client.end()
  }

  @Cron(CronExpression.EVERY_WEEKDAY)
  async loadLoan() {
    Logger.log('Loading loan data...', 'LoanCron')

    const query = `SELECT a.code_region,
    a.name_region,
    b.filial,
    b.code_bxm,
    c.contract_amount_equivalent,
    c.contract_amount_nominal,
    c.contract_date,
    c.inspector,
    c.loan_id,c.overdue_balance,
    c.total_debt,
    c.currency_code,
    c.client_name

    FROM public.nbu_region a 
    join public.nbu_branch b on  a.id = b.region_id 
    join public.nbu_maindata c on b.id = c.branch_id 

    where c.contract_date = $1`
    const yesterday = new Date()
    const dayOfWeek = yesterday.getDay()
    if (dayOfWeek === 1) {
      yesterday.setDate(yesterday.getDate() - 3) // Get Friday's date
    } else {
      yesterday.setDate(yesterday.getDate() - 1)
    }

    const formattedDate = yesterday.toISOString().split('T')[0]
    const loadData = await this.fetchData(query, ['2024-04-13'])

    const regionBosses = await this.prisma.admin.findMany({
      where: { role: Role.REGION_BOSS },
    })

    loadData.forEach(async (loan) => {
      const regionBoss = regionBosses.find((reg) => Number(reg.region) === Number(loan.code_region))

      if (!regionBoss) {
        // Logger.error(`Region boss not found for region ${loan.codeRegion}`)
        return
      }

      console.log(regionBoss)
      const { id: loanId } = await this.prisma.loan.create({
        data: {
          codeRegion: String(loan.code_region),
          bhmCode: String(loan.code_bxm),
          contractAmountEquvivalent: loan.contract_amount_equivalent,
          amount: loan.contract_amount_nominal,
          issuedAt: new Date(loan.contract_date),
          inspector: loan.inspector,
          externalId: loan.loan_id,
          remaining: loan.overdue_balance,
          totalDebt: loan.total_debt,
          codeVal: loan.currency_code,
          borrower: loan.client_name,
          history: {
            create: {
              assigneeId: regionBoss.id,
              status: LoanStatus.PENDING,
            },
          },
        },
        select: { id: true },
      })
      await this.prisma.notification.create({
        data: {
          message: `Sizga ${loanId} raqamli kredit bo'lib berish uchun berildi`,
          adminId: regionBoss.id,
          loanId,
        },
      })

      const checker = await this.prisma.admin.findFirst({
        where: {
          region: loan.codeRegion,
          bhmCode: loan.bhmCode,
        },
      })
      if (!checker) {
        Logger.error(`Checker not found for region ${loan.codeRegion} and BHM code ${loan.bhmCode}`)
        if (!checker) return
      }

      await this.prisma.notification.create({
        data: {
          message: `Sizga ${loanId} raqamli kredit tekshirish uchun berildi`,
          adminId: checker.id,
          loanId,
        },
      })
    })

    Logger.log(loadData.length, ' loans loaded')
  }
}
