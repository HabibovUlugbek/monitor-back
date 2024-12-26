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
import { VerifyAdminInterceptor } from '@interceptors'
import { AssignLoanRequestDto, GetLoanResponseDto, GetLoansDto } from './dtos'

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
  @UseInterceptors(VerifyAdminInterceptor)
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
    type: GetLoansDto,
    isArray: true,
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
  async getLoans(userId: string): Promise<GetLoansDto[]> {
    return this.#_service.getLoans(userId)
  }

  @Post('assign')
  @UseInterceptors(VerifyAdminInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: AssignLoanRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: HttpMessage.NO_CONTENT,
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
  async assignLoan(@Body() body: AssignLoanRequestDto): Promise<void> {
    await this.#_service.assignLoan(body)
  }

  @Get(':id')
  @UseInterceptors(VerifyAdminInterceptor)
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
    type: GetLoanResponseDto,
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
  async getLoan(@Param('id') id: string): Promise<GetLoanResponseDto> {
    return this.#_service.getLoan(id)
  }

  // @Post('upload')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiBody({
  //   // type: SignInRequestDto,
  // })
  // @ApiResponse({
  //   // type: SignInResponseDto,
  //   status: HttpStatus.CREATED,
  //   description: HttpMessage.CREATED,
  // })
  // @ApiResponse({
  //   type: ForbiddenDto,
  //   status: HttpStatus.FORBIDDEN,
  //   description: HttpMessage.FORBIDDEN,
  // })
  // @ApiResponse({
  //   type: ConflictDto,
  //   status: HttpStatus.CONFLICT,
  //   description: HttpMessage.CONFLICT,
  // })
  // @ApiResponse({
  //   type: UnprocessableEntityDto,
  //   status: HttpStatus.UNPROCESSABLE_ENTITY,
  //   description: HttpMessage.UNPROCESSABLE_ENTITY,
  // })
  // @ApiResponse({
  //   type: InternalServerErrorDto,
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: HttpMessage.INTERNAL_SERVER_ERROR,
  // })
  // async uploadLoanInfo(@Body() body: any): Promise<any> {
  //   return this.#_service.uploadLoanInfo(body)
  // }
}
