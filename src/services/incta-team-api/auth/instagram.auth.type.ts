import { SignInFormData } from '@/components/auth/sign-in/logIn-schema'

export type SignUpRequest = {
  captchaToken: string
  email: string
  password: string
  userName: string
}

export type RegistrationConfirmationArgs = {
  confirmationCode: string
}

export type ErrorResponse = {
  data: {
    errorsMessages: [
      {
        field: 'string'
        message: 'string'
      },
    ]
  }
}

// export type SignInRequestBody = {
//   captchaToken: string
//   email: string
//   password: string
// }
//we have a type from loginFormSchema
export type SignInRequestBody = SignInFormData

export type AuthGetResponse = {
  email: string
  userId: string
  userName: string
}

export type ResponseWithAccessToken = {
  accessToken: string
}

export type MeResponse = {
  email: string
  userId: string
  userName: string
}

// {
//   "statusCode": 401,
//     "timestamp": "2024-09-17T13:54:23.262Z",
//     "error": "Incorrect password",
//     "path": "/api/v1/auth/signin",
//     "errorName": "UnauthorizedException"
// }

// {
//   "result": {
//   "error": {
//     "status": 401,
//         "data": {
//       "statusCode": 401,
//           "timestamp": "2024-09-17T11:23:36.268Z",
//           "error": "Unauthorized",
//           "path": "/api/v1/auth/me",
//           "errorName": "UnauthorizedException"
//     }
//   },
//   "meta": {
//     "request": {},
//     "response": {}
//   }
// }
// }

// {
//   "result": {
//   "error": {
//     "status": 401,
//         "data": {
//       "statusCode": 401,
//           "timestamp": "2024-09-17T11:23:39.248Z",
//           "error": "User not found",
//           "path": "/api/v1/auth/signin",
//           "errorName": "UnauthorizedException"
//     }
//   },
//   "meta": {
//     "request": {},
//     "response": {}
//   }
// }
// }

// {
//   "statusCode": 401,
//     "timestamp": "2024-09-17T11:14:23.945Z",
//     "error": "User not found",
//     "path": "/api/v1/auth/signin",
//     "errorName": "UnauthorizedException"
// }

//{
//   "errorsMessages": [
//     {
//       "message": "user account already confirmed"
//     }
//   ]
// }

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

export function isRefreshTokenResponse(obj: unknown): obj is { data: ResponseWithAccessToken } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'data' in obj &&
    typeof obj.data === 'object' &&
    obj.data !== null &&
    'accessToken' in obj.data
  )
}
