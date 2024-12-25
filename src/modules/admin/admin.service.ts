import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import {
  CreateAdminRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
  UpdateAdminRequest,
} from './interfaces'
import { Role } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { ConflictException, NotFoundException } from '@exceptions'
import { AdminResponseDto } from 'modules/super-admin/dtos'

@Injectable()
export class AdminService {
  readonly #_jwt_secret: string
  constructor(private prisma: PrismaService, config: ConfigService) {
    this.#_jwt_secret = config.getOrThrow<string>('jwt.secret')
  }

  async createAdmin(payload: CreateAdminRequest): Promise<void> {
    const hashedPassword = crypto.createHash('sha256').update(payload.password).digest('hex')
    await this.prisma.admin.create({
      data: {
        ...payload,
        role: payload.role as Role,
        password: hashedPassword,
      },
    })
  }

  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    const { password, ...admin } = await this.prisma.admin.findUnique({ where: { username: payload.username } })
    if (!admin) {
      throw new NotFoundException('Admin not found')
    }

    const hashedPassword = crypto.createHash('sha256').update(payload.password).digest('hex')
    if (password !== hashedPassword) {
      throw new ConflictException('Invalid credentials')
    }

    const accessToken = jwt.sign({ ...admin }, this.#_jwt_secret, { expiresIn: '1d' })
    const refreshToken = jwt.sign({ id: admin.id }, this.#_jwt_secret, { expiresIn: '7d' })

    return { accessToken, refreshToken }
  }

  async refreshToken(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const decoded = jwt.verify(payload.refreshToken, this.#_jwt_secret) as jwt.JwtPayload
    const { password, ...admin } = await this.prisma.admin.findUnique({ where: { username: decoded.username } })

    if (!admin) {
      throw new NotFoundException('Admin not found')
    }

    const newAccessToken = jwt.sign({ ...admin }, this.#_jwt_secret, { expiresIn: '1d' })
    const newRefreshToken = jwt.sign({ id: admin.id }, this.#_jwt_secret, { expiresIn: '7d' })

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async updateAdmin(id: string, payload: UpdateAdminRequest): Promise<void> {
    await this.prisma.admin.update({
      where: { id },
      data: { ...payload, role: payload.role as Role },
    })
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.prisma.admin.delete({
      where: { id },
    })
  }

  async getAdmins(userId: string): Promise<AdminResponseDto[]> {
    //find admin by id
    const admin = await this.prisma.admin.findUnique({
      where: { id: userId },
    })

    if (!admin) {
      throw new NotFoundException('Admin not found')
    }

    const admins = []

    if (admin.role === Role.REPUBLIC_BOSS || admin.role === Role.REPUBLIC_EMPLOYEE) {
      const result = await this.prisma.admin.findMany({
        where: { id: { not: userId } },
      })
      admins.push(...result)
    } else if (admin.role === Role.REGION_BOSS) {
      const result = await this.prisma.admin.findMany({
        where: { id: { not: userId }, region: admin.region, role: Role.REGION_EMPLOYEE },
      })
      admins.push(...result)
    } else if (admin.role === Role.REGION_CHECKER_BOSS) {
      const result = await this.prisma.admin.findMany({
        where: { id: { not: userId }, region: admin.region, role: Role.REGION_CHECKER_EMPLOYEE },
      })
      admins.push(...result)
    }

    return admins.map((admin) => {
      return {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        role: admin.role,
        region: admin.region,
      }
    })
  }

  async getMe(id: string): Promise<AdminResponseDto> {
    const me = await this.prisma.admin.findUnique({
      where: { id },
    })

    if (!me) {
      throw new NotFoundException('Admin not found')
    }

    return {
      id: me.id,
      name: me.name,
      username: me.username,
      role: me.role,
      region: me.region,
    }
  }
}
