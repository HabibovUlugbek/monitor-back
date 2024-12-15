import type { NestExpressApplication } from '@nestjs/platform-express'
import { json } from 'express'
import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { ExpressAdapter } from '@nestjs/platform-express'
import { App } from './app'
import { GlobalLoggerInterceptor } from '@logger'
import { appConfig, swaggerConfig } from '@configs'
import { AdminModule, SuperAdminModule } from '@modules'
import { GlobalExceptionFilter } from '@exceptions'

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
  const superAdminDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [SuperAdminModule],
  })

  SwaggerModule.setup('/docs-superadmin', app, superAdminDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  })

  const mainDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AdminModule],
  })

  SwaggerModule.setup('/docs', app, mainDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  })

  await app.listen(Number(appConfig.port), String(appConfig.host))
})
