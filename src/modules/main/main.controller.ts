import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiHeaders, ApiResponse } from '@nestjs/swagger'
import { ExampleDto } from './dtos'
import { MainService } from './main.service'
import {
  ConflictDto,
  ForbiddenDto,
  HttpMessage,
  HttpStatus,
  InternalServerErrorDto,
  UnprocessableEntityDto,
} from '@exceptions'
import { ContentLanguageInterceptor } from '@interceptors'

@Controller()
export class MainController {
  readonly #_service: MainService

  constructor(service: MainService) {
    this.#_service = service
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ContentLanguageInterceptor)
  @ApiBody({
    type: ExampleDto,
  })
  @ApiHeaders([
    {
      name: 'X-Merchant',
      enum: ['1', '0'],
      required: false,
    },
  ])
  // @ApiResponse({
  //   type: ResponseDto,
  //   status: HttpStatus.OK,
  //   description: HttpMessage.OK,
  // })
  @ApiResponse({
    type: ForbiddenDto,
    status: HttpStatus.FORBIDDEN,
    description: HttpMessage.FORBIDDEN,
  })
  @ApiResponse({
    type: ConflictDto,
    status: HttpStatus.CONFLICT,
    description: HttpMessage.CONFLICT,
  })
  @ApiResponse({
    type: UnprocessableEntityDto,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: HttpMessage.UNPROCESSABLE_ENTITY,
  })
  @ApiResponse({
    type: InternalServerErrorDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  getHello(@Body() body: ExampleDto): string {
    return this.#_service.getHello(body)
  }
}
