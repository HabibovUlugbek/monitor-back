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
    const admin = await this.prisma.admin.findUnique({ where: { username: payload.username } })
    if (!admin) {
      throw new NotFoundException('Admin not found')
    }

    const hashedPassword = crypto.createHash('sha256').update(payload.password).digest('hex')
    if (admin.password !== hashedPassword) {
      throw new ConflictException('Invalid credentials')
    }

    const accessToken = jwt.sign(
      { username: admin.username, role: admin.role, region: admin.region },
      this.#_jwt_secret,
      { expiresIn: '1d' },
    )
    const refreshToken = jwt.sign(
      { username: admin.username, role: admin.role, region: admin.region },
      this.#_jwt_secret,
      { expiresIn: '7d' },
    )

    return { accessToken, refreshToken }
  }

  async refreshToken(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const decoded = jwt.verify(payload.refreshToken, this.#_jwt_secret) as jwt.JwtPayload
    const admin = await this.prisma.admin.findUnique({ where: { username: decoded.username } })

    if (!admin) {
      throw new NotFoundException('Admin not found')
    }

    const newAccessToken = jwt.sign(
      { username: admin.username, role: admin.role, region: admin.region },
      this.#_jwt_secret,
      { expiresIn: '1d' },
    )
    const newRefreshToken = jwt.sign(
      { username: admin.username, role: admin.role, region: admin.region },
      this.#_jwt_secret,
      { expiresIn: '7d' },
    )

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
}
