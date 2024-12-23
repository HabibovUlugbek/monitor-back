import type { PrismaServiceOptions } from '@modules'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AdminModule, NotFoundModule, PrismaModule, SuperAdminModule, LoanModule, HealthModule } from '@modules'
import { databaseConfig, jwtConfig } from '@configs'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig],
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
    AdminModule,
    LoanModule,
    SuperAdminModule,
    NotFoundModule,
  ],
})
export class App {}
