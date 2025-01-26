import type { Response } from 'express'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException } from '@nestjs/common'
import { HttpStatus, HttpMessage } from '../enums'
import { httpMessage } from '../helpers'
import { Exception } from '../exceptions'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Response {
    const express = host.switchToHttp()
    const response = express.getResponse<Response>()
    if (exception instanceof Exception) {
      const status = exception.getStatus()
      const message = exception.getMessage()

      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        return response.status(status).json({
          message,
        })
      }

      return response.status(status).json({
        message,
        details: exception.getDetails(),
      })
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const message = httpMessage[status]

      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        return response.status(status).json({
          message,
        })
      }

      return response.status(status).json({
        message,
        details: exception.message,
      })
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: HttpMessage.INTERNAL_SERVER_ERROR,
    })
  }
}
