import type { Prisma } from '@prisma/client'
import type { OnModuleInit, INestApplication, INestMicroservice } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Inject, Injectable, Optional } from '@nestjs/common'
import { PRISMA_SERVICE_OPTIONS, PRISMA_DEFAULT_IMPLICIT_CONNECT } from './prisma.constants'
import type { PrismaServiceOptions } from './prisma.interfaces'

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'info' | 'warn' | 'error' | 'query'>
  implements OnModuleInit
{
  readonly #_implicitConnect: boolean

  constructor(
    @Optional()
    @Inject(PRISMA_SERVICE_OPTIONS)
    options?: PrismaServiceOptions,
  ) {
    super(options?.client)

    if (options?.middlewares) {
      options.middlewares.forEach((middleware: Prisma.Middleware): void => {
        this.$use(middleware)
      })
    }

    this.#_implicitConnect = options?.implicitConnect ?? PRISMA_DEFAULT_IMPLICIT_CONNECT
  }

  async onModuleInit(): Promise<void> {
    if (this.#_implicitConnect) {
      await this.$connect()
    }
  }

  async enableShutdownHooks(app: INestApplication | INestMicroservice): Promise<void> {
    this.$on('beforeExit', async (): Promise<void> => {
      await app.close()
    })
  }
}
