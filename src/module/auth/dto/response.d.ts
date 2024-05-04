interface LoginResponse {
  accessToken: string
  refreshToken: string
}

interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

export type { LoginResponse, RefreshResponse }
