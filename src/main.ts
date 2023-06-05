import type { NestExpressApplication } from '@nestjs/platform-express'
import { json } from 'express'
import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { ExpressAdapter } from '@nestjs/platform-express'
import { GlobalExceptionFilter } from '@exceptions'
import { GlobalLoggerInterceptor } from '@logger'
import { App } from './app.module'
import { appConfig, swaggerConfig } from '@configs'
import { MainModule } from '@modules'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(App, new ExpressAdapter(), {
    cors: {
      maxAge: 0,
      origin: ['*'],
      methods: ['*'],
      credentials: false,
      allowedHeaders: ['*'],
      exposedHeaders: [],
      preflightContinue: false,
      optionsSuccessStatus: 200,
    },
  })

  app.use(
    json({
      limit: '5mb',
    }),
  )

  app.set('env', appConfig.env)
  app.set('etag', 'strong')
  app.set('trust proxy', true)
  app.set('x-powered-by', false)

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  })

  app.useGlobalFilters(new GlobalExceptionFilter())

  app.useGlobalInterceptors(
    new GlobalLoggerInterceptor({
      service: appConfig.name,
    }),
  )

  const mainDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [MainModule],
  })

  SwaggerModule.setup('/docs-main', app, mainDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  })

  await app.listen(Number(appConfig.port), String(appConfig.host))
})
