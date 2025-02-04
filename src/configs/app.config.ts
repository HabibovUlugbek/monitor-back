export declare interface AppConfig {
  env?: string
  name?: string
  host?: string
  port?: number
}

export const appConfig: AppConfig = {
  env: process.env.NODE_ENV ?? undefined,
  name: process.env.APP_NAME ?? undefined,
  host: process.env.APP_HOST ?? '127.0.0.1',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
}
