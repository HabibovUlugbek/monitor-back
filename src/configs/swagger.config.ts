import type { OpenAPIObject } from '@nestjs/swagger'

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = {
  openapi: '3.0.0',
  info: {
    title: 'Gateway',
    version: '1.0.0',
    description: 'REST API Documentation',
  },
}
