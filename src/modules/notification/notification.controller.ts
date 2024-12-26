import { Controller, Get, Post, Param, HttpCode, Req, UseInterceptors } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ForbiddenDto, HttpMessage, HttpStatus, InternalServerErrorDto, UnprocessableEntityDto } from '@exceptions'
import { GetNotificationsDto } from './dtos/get-notifications.dto'
import { VerifyAdminInterceptor } from '@interceptors'

@ApiTags('Notifications Service')
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationController {
  readonly #_service: NotificationService

  constructor(service: NotificationService) {
    this.#_service = service
  }

  @Get()
  @UseInterceptors(VerifyAdminInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: GetNotificationsDto,
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
    type: UnprocessableEntityDto,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: HttpMessage.UNPROCESSABLE_ENTITY,
  })
  @ApiResponse({
    type: InternalServerErrorDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  getNotifications(@Req() { userId }: { userId: string }): Promise<GetNotificationsDto[]> {
    return this.#_service.getNotifications(userId)
  }

  @Post('/:id')
  @UseInterceptors(VerifyAdminInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
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
    type: UnprocessableEntityDto,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: HttpMessage.UNPROCESSABLE_ENTITY,
  })
  @ApiResponse({
    type: InternalServerErrorDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  markAsRead(@Param('id') id: string): Promise<void> {
    return this.#_service.markAsRead(id)
  }
}
