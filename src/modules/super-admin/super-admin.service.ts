import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '@modules'
import { ConflictException, NotFoundException } from '@exceptions'
import { DeleteRequest, RefreshTokenRequest, RefreshTokenResponse, SignInRequest, SignInResponse } from './interfaces'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { AdminResponseDto } from './dtos'

@Injectable()
export class SuperAdminService {
  readonly #_prisma: PrismaService
  readonly #_jwt_secret: string

  constructor(prisma: PrismaService, config: ConfigService) {
    this.#_prisma = prisma
    this.#_jwt_secret = config.getOrThrow<string>('JWT_SECRET')
  }

  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    const superAdmin = await this.#_prisma.superAdmin.findUnique({ where: { username: payload.username } })

    if (!superAdmin) {
      throw new NotFoundException('Super admin not found')
    }

    const hashedPassword = crypto.createHash('sha256').update(payload.password).digest('hex')

    if (superAdmin.password !== hashedPassword) {
      throw new ConflictException('Invalid password')
    }

    const accessToken = jwt.sign({ ...superAdmin }, this.#_jwt_secret, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ id: superAdmin.id }, this.#_jwt_secret, { expiresIn: '7d' })

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken({ refreshToken }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    try {
      const decoded = jwt.verify(refreshToken, this.#_jwt_secret) as { id: string }
      const superAdmin = await this.#_prisma.superAdmin.findUnique({ where: { id: decoded.id } })

      if (!superAdmin) {
        throw new NotFoundException('Super admin not found')
      }

      const newAccessToken = jwt.sign({ ...superAdmin }, this.#_jwt_secret, { expiresIn: '1h' })
      const newRefreshToken = jwt.sign({ id: superAdmin.id }, this.#_jwt_secret, { expiresIn: '7d' })

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    } catch (error) {
      throw new ConflictException('Invalid refresh token')
    }
  }

  async deleteSuperAdmin(payload: DeleteRequest): Promise<void> {
    const superAdmin = await this.#_prisma.superAdmin.findUnique({ where: { username: payload.username } })

    if (!superAdmin) {
      throw new NotFoundException('Admin not found')
    }

    const hashedPassword = crypto.createHash('sha256').update(payload.password).digest('hex')

    if (superAdmin.password !== hashedPassword) {
      throw new ConflictException('Invalid password')
    }
    await this.#_prisma.superAdmin.delete({ where: { id: superAdmin.id } })
  }

  async getAdmins(): Promise<AdminResponseDto[]> {
    const admins = await this.#_prisma.admin.findMany()

    return admins.map((admin) => ({
      id: admin.id,
      username: admin.username,
      name: admin.name,
      region: admin?.region,
      role: admin.role,
    }))
  }
}
