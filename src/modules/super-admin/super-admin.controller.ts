import { Body, Controller, Delete, Get, HttpCode, Post, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  AdminResponseDto,
  DeleteRequestDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  SignInRequestDto,
  SignInResponseDto,
} from './dtos'
import { SuperAdminService } from './super-admin.service'
import {
  ConflictDto,
  ForbiddenDto,
  HttpMessage,
  HttpStatus,
  InternalServerErrorDto,
  UnprocessableEntityDto,
} from '@exceptions'
import { VerifySuperAdminInterceptor } from '@interceptors'

@ApiTags('Super Admin Service')
@Controller({
  path: 'super-admin',
  version: '1',
})
export class SuperAdminController {
  readonly #_service: SuperAdminService

  constructor(service: SuperAdminService) {
    this.#_service = service
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SignInRequestDto,
  })
  @ApiResponse({
    type: SignInResponseDto,
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
  signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    return this.#_service.signIn(body)
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: RefreshTokenRequestDto,
  })
  @ApiResponse({
    type: RefreshTokenResponseDto,
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
  refreshToken(@Body() body: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    return this.#_service.refreshToken(body)
  }

  @Delete('delete')
  @UseInterceptors(VerifySuperAdminInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Authorization token',
      required: true,
    },
  ])
  @ApiBody({
    type: DeleteRequestDto,
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
  async deleteSuperAdmin(@Body() body: DeleteRequestDto): Promise<void> {
    await this.#_service.deleteSuperAdmin(body)
  }

  @Get('admins')
  @UseInterceptors(VerifySuperAdminInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: AdminResponseDto,
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
  async getAdmins(): Promise<AdminResponseDto[]> {
    return await this.#_service.getAdmins()
  }
}
