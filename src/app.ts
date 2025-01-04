import type { PrismaServiceOptions } from '@modules'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  AdminModule,
  NotFoundModule,
  PrismaModule,
  SuperAdminModule,
  LoanModule,
  HealthModule,
  NotificationModule,
} from '@modules'
import { databaseConfig, jwtConfig } from '@configs'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the folder with static files
      serveRoot: '/files', // Optional: Set a URL prefix for the static files
    }),
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
    NotificationModule,
    // NotFoundModule,
  ],
})
export class App {}
