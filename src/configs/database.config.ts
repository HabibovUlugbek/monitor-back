import { registerAs } from '@nestjs/config'

export interface DatabaseConfig {
  url: string
}

export const databaseConfig = registerAs('database', (): DatabaseConfig => {
  return {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5432/postgres',
  }
})
