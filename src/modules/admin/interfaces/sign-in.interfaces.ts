export interface SignInRequest {
  username: string
  password: string
}

export interface SignInResponse {
  accessToken: string
  refreshToken: string
}
