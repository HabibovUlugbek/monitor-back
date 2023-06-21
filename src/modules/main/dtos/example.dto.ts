import { ApiProperty } from '@nestjs/swagger'
import type { Example } from '../interfaces'

export class ExampleDto implements Example {
  @ApiProperty()
  readonly name: string
}
