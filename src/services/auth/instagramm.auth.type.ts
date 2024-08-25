import { string } from 'zod'

export type SignUpRequest = {
  email: string
  login: string
  password: string
  repeatPassword: string
  agreement: string
}

export type Respones = {
  success: successSignUpResponse
  badRequest: badRegisterResponse
  
}

export type successSignUpResponse = {
  success: boolean
  message: string
}

export type badRegisterResponse = {
  statusCode: number
  message: string
  errors: string[]
}

export type SignInRequest = {
  email: string
  password: string
}

export type getResponse = {
  agreement: number
  provider: string
}
