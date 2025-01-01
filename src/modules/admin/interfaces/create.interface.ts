import { Role } from '@prisma/client'

export interface CreateAdminRequest {
  username: string
  password: string
  name: string
  region?: string
  role?: Role
  bhmCode?: string
}
