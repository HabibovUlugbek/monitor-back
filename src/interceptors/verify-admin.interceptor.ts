import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PrismaService } from '@modules'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class VerifyAdminInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(' ')[1]

    if (!token) {
      throw new ForbiddenException('No token provided')
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
      const admin = await this.prisma.admin.findUnique({
        where: { id: decoded.id },
      })

      if (!admin) {
        throw new ForbiddenException('Access denied')
      }

      request.userId = decoded.id

      return next.handle()
    } catch (error) {
      throw new ForbiddenException('Invalid token')
    }
  }
}
