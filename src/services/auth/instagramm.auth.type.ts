import { string } from "zod"

export interface SungUpRequest {
  email: string
  login: string
  password: string
  repeatPassword: string
  agreement: string
}

export interface SignedUpResponse {
  success: successSingUpResponse
  badRequest: badRegisterResponse
  conflict: conflictResponse
}

export interface successSingUpResponse {
  success: boolean
  message: string
}

export interface badRegisterResponse {
  statusCode: number
  message: string
  errors: string[]
}

export interface conflictResponse {
  statusCode: number
  message: string
  errors: string[]
}

export interface SingInRequest {
    email: string;
    password: string;
  }

  export interface SignedInResponse {
    success: successSingInResponse;
    unauthorized: Unauthorized
  }

  export interface successSingInResponse {
    success: boolean
    message: string
  }

  export interface Unauthorized {
    statusCode: number;
    message: string;
    errors: string[];
  }
  
  export interface getResponse {
    agreement: number;
    provider:string; 
  }