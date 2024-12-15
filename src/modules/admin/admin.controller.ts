import { Body, Controller, Delete, HttpCode, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateAdminDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  SignInRequestDto,
  SignInResponseDto,
  UpdateAdminDto,
} from './dtos'
import {
  ConflictDto,
  ForbiddenDto,
  HttpMessage,
  HttpStatus,
  InternalServerErrorDto,
  UnprocessableEntityDto,
} from '@exceptions'
import { VerySuperAdminInterceptor } from '@interceptors'
import { AdminService } from './admin.service'

@ApiTags('Super Admin Service')
@Controller({
  path: 'admin',
  version: '1',
})
export class AdminController {
  readonly #_service: AdminService

  constructor(service: AdminService) {
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
  @UseInterceptors(VerySuperAdminInterceptor)
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
  async deleteAdmin(@Param() id: string): Promise<void> {
    await this.#_service.deleteAdmin(id.toString())
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: SignInRequestDto,
  })
  @ApiResponse({
    type: SignInResponseDto,
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
  async createAdmin(@Body() body: CreateAdminDto): Promise<void> {
    await this.#_service.createAdmin(body)
  }

  @Patch('/:id')
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
  async updateAdmin(@Param('id') id: string, @Body() body: UpdateAdminDto): Promise<void> {
    await this.#_service.updateAdmin(id, body)
  }
}
