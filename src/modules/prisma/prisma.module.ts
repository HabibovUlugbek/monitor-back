import type { Provider, DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants'
import type {
  PrismaModuleOptions,
  PrismaModuleAsyncOptions,
  PrismaServiceOptions,
  PrismaServiceOptionsFactory,
} from './prisma.interfaces'

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {
  static forRoot(options?: PrismaModuleOptions): DynamicModule {
    return {
      module: PrismaModule,
      global: options?.isGlobal,
      providers: [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useValue: {
            client: options?.client,
            middlewares: options?.middlewares,
            implicitConnect: options?.implicitConnect,
          },
        },
      ],
    }
  }

  static forRootAsync(options?: PrismaModuleAsyncOptions): DynamicModule {
    return {
      module: PrismaModule,
      global: options?.isGlobal,
      imports: options?.imports ?? [],
      providers: this.createAsyncProviders(options),
    }
  }

  private static createAsyncProviders(options?: PrismaModuleAsyncOptions): Provider[] {
    if (options?.useExisting || options?.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options?.useClass,
        useClass: options?.useClass,
      },
    ]
  }

  private static createAsyncOptionsProvider(options?: PrismaModuleAsyncOptions): Provider {
    if (options?.useFactory) {
      return {
        inject: options?.inject ?? [],
        provide: PRISMA_SERVICE_OPTIONS,
        useFactory: options?.useFactory,
      }
    }

    return {
      inject: [options?.useExisting ?? options?.useClass],
      provide: PRISMA_SERVICE_OPTIONS,
      useFactory: async (factory: PrismaServiceOptionsFactory): Promise<PrismaServiceOptions> =>
        await factory.createPrismaServiceOptions(),
    }
  }
}
