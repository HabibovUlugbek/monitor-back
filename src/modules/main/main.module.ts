import { Module } from '@nestjs/common'
import { MainAuthController } from './main-auth.controller'
import { MainProfileController } from './main-profile.controller'

@Module({
  controllers: [MainAuthController, MainProfileController],
})
export class MainModule {}
