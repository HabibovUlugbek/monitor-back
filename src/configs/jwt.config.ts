import { registerAs } from '@nestjs/config'

export interface JwtConfig {
  secret: string
}

export const jwtConfig = registerAs('jwt', (): JwtConfig => {
  return {
    secret: process.env.JWT_SECRET || 'justanotherway',
  }
})
