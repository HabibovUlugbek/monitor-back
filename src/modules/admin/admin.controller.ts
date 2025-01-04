import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBody, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateAdminDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  SignInRequestDto,
  SignInResponseDto,
  UpdateAdminDto,
  StatsFilterQueryDto,
  StatsResponseDto,
} from './dtos'
import {
  ConflictDto,
  ForbiddenDto,
  HttpMessage,
  HttpStatus,
  InternalServerErrorDto,
  UnprocessableEntityDto,
} from '@exceptions'
import { VerifyRolesInterceptor, VerifyAdminInterceptor } from '@interceptors'
import { AdminService } from './admin.service'
import { AdminResponseDto } from 'modules/super-admin/dtos'
import { Request } from 'express'

@ApiTags('Admin Service')
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

  @Delete('/:id')
  @UseInterceptors(VerifyRolesInterceptor)
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
  async deleteAdmin(@Param() { id }: { id: string }): Promise<void> {
    await this.#_service.deleteAdmin(id.toString())
  }

  @Post()
  @UseInterceptors(VerifyRolesInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: CreateAdminDto,
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
  async createAdmin(@Body() body: CreateAdminDto): Promise<void> {
    await this.#_service.createAdmin(body)
  }

  @Patch('/:id')
  @UseInterceptors(VerifyRolesInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: UpdateAdminDto,
  })
  @ApiResponse({
    type: SignInResponseDto,
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
  async updateAdmin(@Param('id') id: string, @Body() body: UpdateAdminDto): Promise<void> {
    await this.#_service.updateAdmin(id, body)
  }

  @Get('')
  @UseInterceptors(VerifyAdminInterceptor)
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
    type: InternalServerErrorDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  async getAdmins(@Req() req: Request & { userId: string }): Promise<AdminResponseDto[]> {
    return await this.#_service.getAdmins(req.userId)
  }

  @Get('me')
  @UseInterceptors(VerifyAdminInterceptor)
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
    type: InternalServerErrorDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  async getMe(@Req() req: Request & { userId: string }): Promise<AdminResponseDto> {
    return await this.#_service.getMe(req.userId)
  }

  @Get('stats')
  @UseInterceptors(VerifyRolesInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: StatsResponseDto,
    isArray: true,
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
    type: InternalServerErrorDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  async getStats(
    @Query() filter: StatsFilterQueryDto,
    @Req() { userId }: { userId: string },
  ): Promise<StatsResponseDto[]> {
    return await this.#_service.getStats(userId, filter)
  }
}
