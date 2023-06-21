import { Global, Module } from '@nestjs/common'
import { NotifyService } from './notify.service'

@Global()
@Module({
  exports: [NotifyService],
  providers: [NotifyService],
})
export class NotifyModule {}
