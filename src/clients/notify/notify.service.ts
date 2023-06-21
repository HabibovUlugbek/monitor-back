import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RequestTimeoutException, InternalServerErrorException } from '@exceptions'
import type { CodeSendRequest, CodeSendResponse, CodeCheckRequest, CodeCheckResponse } from './interfaces'

@Injectable()
export class NotifyService {
  readonly #_axios: AxiosInstance

  constructor(config: ConfigService) {
    this.#_axios = axios.create({
      baseURL: config.getOrThrow<string>('notify.url'),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: config.getOrThrow<number>('notify.timeout'),
      validateStatus: (status: number): boolean => status > 199 && status < 300,
    })
  }

  codeSend(payload: CodeSendRequest): Promise<CodeSendResponse> {
    return this.#_request<CodeSendRequest, CodeSendResponse>('/sms/send-code', payload)
  }

  codeCheck(payload: CodeCheckRequest): Promise<CodeCheckResponse> {
    return this.#_request<CodeCheckRequest, CodeCheckResponse>('/sms/check-code', payload)
  }

  async #_request<TRequest = any, TResponse = any>(url: string, payload: TRequest): Promise<TResponse> {
    try {
      const { data } = await this.#_axios.request<TResponse>({
        url,
        method: 'POST',
        data: payload,
      })

      return data
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        throw new RequestTimeoutException(error)
      }

      throw new InternalServerErrorException(error)
    }
  }
}
