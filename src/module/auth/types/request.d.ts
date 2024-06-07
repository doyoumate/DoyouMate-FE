interface LoginRequest {
  studentNumber: string
  password: string
}

interface SendCertificationRequest {
  studentNumber: string
  to: string
}

interface SignUpRequest {
  studentNumber: string
  code: string
  password: String
}

interface RefreshRequest {
  refreshToken: string
}

export type { LoginRequest, SendCertificationRequest, SignUpRequest, RefreshRequest }
