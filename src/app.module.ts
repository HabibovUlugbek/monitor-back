import type { PrismaServiceOptions } from '@modules'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MainModule, NotFoundModule, PrismaModule } from '@modules'
import { databaseConfig } from '@configs'
import { HealthModule } from 'modules/health'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      cache: true,
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: (config: ConfigService): PrismaServiceOptions => ({
        client: {
          datasources: {
            db: {
              url: config.getOrThrow<string>('DATABASE_URL'),
            },
          },
        },
      }),
    }),
    HealthModule,
    MainModule,
    NotFoundModule,
  ],
})
export class App {}
