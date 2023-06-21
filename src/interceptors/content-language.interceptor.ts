import type { CallHandler, NestInterceptor, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ContentLanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpData = context.switchToHttp().getRequest()

    const { headers } = httpData

    if (!headers.language) {
      httpData.language = 'Ru'
    }

    httpData.language = headers.language

    return next.handle()
  }
}
