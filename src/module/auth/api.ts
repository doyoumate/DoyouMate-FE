import { POST } from '../../lib/axios/methods.ts'
import { LoginRequest, RefreshRequest, SendCertificationRequest, SignUpRequest } from './types/request'
import { LoginResponse, RefreshResponse } from './types/response'

const login = (request: LoginRequest) => POST<LoginResponse>(`/auth/login`, request)

const certificate = (request: SendCertificationRequest) => POST(`/auth/certificate`, request)

const signUp = (request: SignUpRequest) => POST(`/auth/sign-up`, request)

const refresh = (request: RefreshRequest) => POST<RefreshResponse>(`/auth/refresh`, request)

export { login, certificate, signUp, refresh }
