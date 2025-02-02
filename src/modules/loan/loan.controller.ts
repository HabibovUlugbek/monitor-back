import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBody, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ConflictDto,
  ForbiddenDto,
  HttpMessage,
  HttpStatus,
  InternalServerErrorDto,
  UnprocessableEntityDto,
} from '@exceptions'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { LoanService } from './loan.service'
import { VerifyAdminInterceptor, VerifyRolesInterceptor } from '@interceptors'
import { AssignLoanRequestDto, GetLoanResponseDto, GetLoansDto, LoanStatsDto, SendMessageRequestDto } from './dtos'
import { Response } from 'express'

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
  async assignLoan(@Body() body: AssignLoanRequestDto, @Req() { userId }: { userId: string }): Promise<void> {
    await this.#_service.assignLoan(body, userId)
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

  @Post('approve/:id')
  @UseInterceptors(VerifyAdminInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Authorization token',
      required: true,
    },
  ])
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
  async approveLoan(@Param('id') id: string, @Req() { userId }: { userId: string }): Promise<void> {
    await this.#_service.approveLoan(id, userId)
  }

  @Post('reject/:id')
  @UseInterceptors(VerifyAdminInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Authorization token',
      required: true,
    },
  ])
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
  async rejectLoan(@Param('id') id: string, @Req() { userId }: { userId: string }): Promise<void> {
    await this.#_service.rejectLoan(id, userId)
  }

  @Post(':loanId/upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(VerifyAdminInterceptor)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Save to `uploads` folder
        filename: (req, file, cb) => {
          const fileName = `${file.originalname}`
          cb(null, fileName) // Generate a unique file name
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('loanId') loanId: string,
    @Query() query: { name: string; pages: string; comment: string },
    @Req() { userId }: { userId: string },
  ) {
    const filePath = `/files/${file?.filename}`
    this.#_service.uploadInfo(loanId, filePath, userId, query)
  }

  @Get(':id/files')
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
    type: String,
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
  async getLoanFiles(@Param('id') id: string): Promise<any> {
    return this.#_service.getLoanFiles(id)
  }

  @Get(':id/download')
  async getPdf(@Param('id') id: string, @Res() res: Response) {
    const pdfBuffer = await this.#_service.genereatePDF(id)
  }

  @Post('stats')
  @UseInterceptors(VerifyRolesInterceptor)
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
    type: LoanStatsDto,
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
  async getLoanStats(): Promise<LoanStatsDto[]> {
    return await this.#_service.getLoanStats()
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
  async getLoans(@Req() { userId }: { userId: string }): Promise<GetLoansDto[]> {
    return this.#_service.getLoans(userId)
  }

  @Post('send/message')
  @UseInterceptors(VerifyAdminInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Authorization token',
      required: true,
    },
  ])
  @ApiBody({
    type: SendMessageRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: HttpMessage.OK,
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
  async sendMessage(@Body() body: SendMessageRequestDto, @Req() { userId }: { userId: string }): Promise<void> {
    await this.#_service.sendMessage(userId, body)
  }
}
