import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ConflictDto,
  ForbiddenDto,
  HttpMessage,
  HttpStatus,
  InternalServerErrorDto,
  UnprocessableEntityDto,
} from '@exceptions'
import { LoanService } from './loan.service'

@ApiTags('Loan Service')
@Controller({
  path: 'loan',
  version: '1',
})
export class LoanController {
  readonly #_service: LoanService

  constructor(service: LoanService) {
    this.#_service = service
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Authorization token',
      required: true,
    },
  ])
  @ApiResponse({
    status: HttpStatus.OK,
    description: HttpMessage.OK,
    // type: [SignInResponseDto],
  })
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
  async getLoans(userId: string): Promise<any[]> {
    return this.#_service.getLoans({ userId })
  }

  @Post('assign')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    // type: SignInRequestDto,
  })
  @ApiResponse({
    // type: SignInResponseDto,
    status: HttpStatus.CREATED,
    description: HttpMessage.CREATED,
  })
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
  async assignLoan(@Body() body: any): Promise<any> {
    return this.#_service.assignLoan(body)
  }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    // type: SignInRequestDto,
  })
  @ApiResponse({
    // type: SignInResponseDto,
    status: HttpStatus.CREATED,
    description: HttpMessage.CREATED,
  })
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
  async uploadLoanInfo(@Body() body: any): Promise<any> {
    return this.#_service.uploadLoanInfo(body)
  }
}
