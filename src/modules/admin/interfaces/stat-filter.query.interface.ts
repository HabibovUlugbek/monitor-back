export interface StatsFilterQuery {
  startDate?: string
  endDate?: string
  region?: string
}

export interface StatsResponse {
  id: string
  name: string
  username: string
  role: string
  region: string
  stats: TaskStats
}

export interface TaskStats {
  inProcess: number
  rejected: number
  outdated: number
  approved: number
}
