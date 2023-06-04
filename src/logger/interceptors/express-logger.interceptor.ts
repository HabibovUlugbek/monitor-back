import type { Request, Response } from 'express'
import type { CallHandler, NestInterceptor, ExecutionContext } from '@nestjs/common'
import { tap, Observable } from 'rxjs'
import { Injectable, HttpException } from '@nestjs/common'
import { Exception, HttpStatus, HttpMessage } from '@exceptions'
import { LoggerService } from '../services'
import { uuid, httpMessage } from '../helpers'
import type { LoggerOptions } from '../interfaces'

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  readonly #_logger: LoggerService

  constructor(options?: LoggerOptions) {
    this.#_logger = new LoggerService(options)
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rid = uuid()

    const controller = context.getClass()
    const handler = context.getHandler()
    const http = context.switchToHttp()

    const request = http.getRequest<Request>()

    this.#_logger.log({
      rid,
      type: 'request',
      ip: request.ip,
      protocol: request.protocol,
      hostname: request.hostname,
      url: request.url,
      method: request.method,
      headers: request.headers,
      query: request.query,
      params: request.params,
      controller: controller.name,
      handler: handler.name,
      data: request.body,
    })

    return next.handle().pipe(
      tap({
        next: (data: any): void => {
          const response = http.getResponse<Response>()

          this.#_logger.log({
            rid,
            type: 'response',
            ip: request.ip,
            protocol: request.protocol,
            hostname: request.hostname,
            url: request.url,
            method: request.method,
            headers: response.getHeaders(),
            status: response.statusCode,
            query: request.query,
            params: request.params,
            controller: controller.name,
            handler: handler.name,
            data,
          })
        },
        error: (error: any): void => {
          const response = http.getResponse<Response>()

          if (error instanceof Exception) {
            const status = error.getStatus()

            this.#_logger.log({
              rid,
              type: 'response',
              ip: request.ip,
              protocol: request.protocol,
              hostname: request.hostname,
              url: request.url,
              method: request.method,
              headers: response.getHeaders(),
              status,
              query: request.query,
              params: request.params,
              controller: controller.name,
              handler: handler.name,
              data: {
                status,
                message: error.getMessage(),
                details: error.getDetails(),
                exception: error.getException(),
              },
            })
          } else if (error instanceof HttpException) {
            const status = error.getStatus()

            this.#_logger.log({
              rid,
              type: 'response',
              ip: request.ip,
              protocol: request.protocol,
              hostname: request.hostname,
              url: request.url,
              method: request.method,
              headers: response.getHeaders(),
              status,
              query: request.query,
              params: request.params,
              controller: controller.name,
              handler: handler.name,
              data: {
                status,
                message: httpMessage[status],
                details: error.message,
                exception: error.name,
              },
            })
          } else {
            this.#_logger.log({
              rid,
              type: 'response',
              ip: request.ip,
              protocol: request.protocol,
              hostname: request.hostname,
              url: request.url,
              method: request.method,
              headers: response.getHeaders(),
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              query: request.query,
              params: request.params,
              controller: controller.name,
              handler: handler.name,
              data: {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: HttpMessage.INTERNAL_SERVER_ERROR,
                details: error,
                exception: 'InternalServerErrorException',
              },
            })
          }
        },
      }),
    )
  }
}
