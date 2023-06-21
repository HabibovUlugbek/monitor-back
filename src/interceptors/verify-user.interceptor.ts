import type { Request } from 'express'
import type { CallHandler, NestInterceptor, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { isJWT } from 'class-validator'
import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@exceptions'
import { MainService } from '@modules'

@Injectable()
export class VerifyUserInterceptor implements NestInterceptor {
  readonly #_ams: MainService

  constructor(ams: MainService) {
    this.#_ams = ams
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()

    const accessToken = request.headers.authorization?.replace(/^(bearer)\s/i, '')

    if (!accessToken || !isJWT(accessToken)) {
      throw new UnauthorizedException('Unauthorized.')
    }

    // const userProfile = await this.#_ams
    //   .mainProfileRead({
    //     ip: request.ip,
    //     accessToken,
    //   })
    //   .catch((error: any) => {
    //     console.log('VerifyUserInterceptor:', error)

    //     throw error
    //   })

    const userProfile = {
      id: 1,
      phone: '1234567890',
    }

    Object.assign(request.body, {
      userId: userProfile.id,
      phone: userProfile.phone,
    })

    return next.handle()
  }
}
