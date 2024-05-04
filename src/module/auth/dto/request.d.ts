interface LoginRequest {
  studentNumber: string
  password: string
}

interface SendCertificationRequest {
  studentNumber: string
  to: string
}

interface SignUpRequest {
  certification: Certification
  password: String
}

interface RefreshRequest {
  refreshToken: string
}

interface Certification {
  studentNumber: string
  code: string
}

export type { LoginRequest, SendCertificationRequest, SignUpRequest, RefreshRequest }
