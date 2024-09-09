import { string } from 'zod'

export interface SignUpRequest {
  email: string;
  password: string;
  userName: string;
  
}

export interface SignInRequest {
  email: string;
  password: string;
  
}
export interface AuthGetResponse {
  email: string;
  userName: string;
  userId: string;
}
//--------------------------------------------------------
// export type Respones = {
//   success: successSignUpResponse
//   badRequest: badRegisterResponse
// }

// export type successSignUpResponse = {
//   success: boolean
//   message: string
// }

// export type badRegisterResponse = {
//   statusCode: number
//   message: string
//   errors: string[]
// }

// export type getResponse = {
//   agreement: number
//   provider: string
// }
//-------------------------------------------------------
// export interface ErrorsMessage {
//   message: string;
//   field: string;
// }

// export interface Data {
//   errorsMessages: ErrorsMessage[];
// }