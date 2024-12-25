export declare interface AppConfig {
  env?: string
  name?: string
  host?: string
  port?: number
}

export const appConfig: AppConfig = {
  env: process.env.NODE_ENV ?? undefined,
  name: process.env.APP_NAME ?? undefined,
  host: process.env.APP_HOST ?? '0.0.0.0',
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 4000,
}
