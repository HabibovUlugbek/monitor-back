import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PrismaService } from '@modules'
import * as jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'
import { NotFoundException } from '@exceptions'

@Injectable()
export class VerifyRolesInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(' ')[1]

    if (!token) {
      throw new ForbiddenException('No token provided')
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
      const superAdmin = await this.prisma.superAdmin.findUnique({
        where: { id: decoded.id },
      })

      const admin = await this.prisma.admin.findUnique({
        where: { id: decoded.id },
      })

      if (!superAdmin && !admin) {
        throw new NotFoundException('Admin not found')
      }

      if (admin && ![String(Role.REPUBLIC_BOSS), Role.REPUBLIC_EMPLOYEE].includes(String(admin.role))) {
        throw new ForbiddenException("You don't have permission to access this resource")
      }

      request.userId = decoded.id
      return next.handle()
    } catch (error) {
      throw new ForbiddenException('Invalid token')
    }
  }
}
