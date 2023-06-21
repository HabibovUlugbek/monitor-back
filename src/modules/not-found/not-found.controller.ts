import type { Request } from 'express'
import { All, Req, HttpCode, Controller } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { HttpStatus, NotFoundException } from '@exceptions'

@Controller()
@ApiExcludeController()
export class NotFoundController {
  @All('*')
  @HttpCode(HttpStatus.NOT_FOUND)
  throw(@Req() request: Request): never {
    throw new NotFoundException(`Cannot ${request.method} ${request.url}`)
  }
}
