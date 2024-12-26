import { Module } from '@nestjs/common'
import { LoanService } from './loan.service'
import { LoanController } from './loan.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { LoadLoanService } from './load-loan.cron.service'
import { CheckAssignService } from './check-assign.cron.service'
import { ChecInfoService } from './check-info-finished.service'

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [LoanController],
  providers: [LoanService, LoadLoanService, CheckAssignService, ChecInfoService],
})
export class LoanModule {}
