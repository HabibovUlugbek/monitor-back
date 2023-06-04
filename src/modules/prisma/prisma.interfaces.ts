import type { Prisma } from '@prisma/client'
import type { Type, ModuleMetadata } from '@nestjs/common'

export declare interface PrismaModuleOptions extends PrismaServiceOptions {
  isGlobal?: boolean
}

export declare interface PrismaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  isGlobal?: boolean
  useClass?: Type<PrismaServiceOptionsFactory>
  useFactory?: (...args: any[]) => PrismaServiceOptions | Promise<PrismaServiceOptions>
  useExisting?: Type<PrismaServiceOptionsFactory>
}

export declare interface PrismaServiceOptions {
  client?: Prisma.PrismaClientOptions
  middlewares?: Prisma.Middleware[]
  implicitConnect?: boolean
}

export declare interface PrismaServiceOptionsFactory {
  createPrismaServiceOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions>
}
