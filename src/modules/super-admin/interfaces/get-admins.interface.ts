import { Role } from '@prisma/client'

export declare interface AdminResponse {
  id: string
  username: string
  name: string
  region?: string
  role: Role
}
