import { POST } from '../../lib/axios.ts'
import { LoginRequest, RefreshRequest, SendCertificationRequest, SignUpRequest } from './dto/request'
import { LoginResponse, RefreshResponse } from './dto/response'

const login = (request: LoginRequest) => POST<LoginResponse>(`/auth/login`, request)

const certificate = (request: SendCertificationRequest) => POST(`/auth/certificate`, request)

const signUp = (request: SignUpRequest) => POST(`/auth/sign-up`, request)

const refresh = (request: RefreshRequest) => POST<RefreshResponse>(`/auth/refresh`, request)

export { login, certificate, signUp, refresh }
