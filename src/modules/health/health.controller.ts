import { Get, HttpCode, Controller } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { HttpStatus, HttpMessage } from '@exceptions'

@Controller('health')
@ApiExcludeController()
export class HealthController {
  @Get('ping')
  @HttpCode(HttpStatus.OK)
  ping(): HttpMessage.OK {
    return HttpMessage.OK
  }
}
