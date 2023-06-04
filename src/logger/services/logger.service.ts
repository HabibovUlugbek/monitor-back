import os from 'os'
import { Injectable } from '@nestjs/common'
import { LoggerLevel } from '../enums'
import type { LoggerParams, LoggerOptions } from '../interfaces'

@Injectable()
export class LoggerService {
  readonly #_pid: number
  readonly #_service: string
  readonly #_hostname: string

  constructor(options?: LoggerOptions) {
    this.#_pid = options?.pid ?? process.pid
    this.#_service = options?.service ?? 'unknown'
    this.#_hostname = options?.hostname ?? os.hostname()
  }

  log(context: any): void {
    this.#_write(LoggerLevel.LOG, context)
  }

  info(context: any): void {
    this.#_write(LoggerLevel.INFO, context)
  }

  warn(context: any): void {
    this.#_write(LoggerLevel.WARN, context)
  }

  error(context: any): void {
    this.#_write(LoggerLevel.ERROR, context)
  }

  debug(context: any): void {
    this.#_write(LoggerLevel.DEBUG, context)
  }

  #_write(level: LoggerLevel, context: any): void {
    const params: LoggerParams = {
      pid: this.#_pid,
      level,
      service: this.#_service,
      hostname: this.#_hostname,
      timestamp: new Date().toISOString(),
      context,
    }

    process.stdout.write(`${JSON.stringify(params)}\n`)
  }
}
