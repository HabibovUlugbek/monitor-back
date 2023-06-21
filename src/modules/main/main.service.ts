import { Injectable } from '@nestjs/common'
import type { Example } from './interfaces'

@Injectable()
export class MainService {
  getHello(paylaod: Example): string {
    return 'Hello World!'
  }
}
