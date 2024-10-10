export type FormFieldError = {
  field: string
  message: string
}

export type FormDataErrorResponse = {
  errorsMessages: FormFieldError[]
}

type FormError = {
  data: FormDataErrorResponse
  status: number
}

export function isFormDataErrorResponse(obj: unknown): obj is FormDataErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'errorsMessages' in obj &&
    Array.isArray(obj.errorsMessages)
  )
}

export function isFormFieldError(obj: unknown): obj is FormFieldError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'field' in obj &&
    typeof obj.field === 'string' &&
    'message' in obj &&
    typeof obj.message === 'string'
  )
}

export function isFormError(obj: unknown): obj is FormError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'data' in obj &&
    typeof obj.data === 'object' &&
    obj.data !== null &&
    'errorsMessages' in obj.data
  )
}

export type ErrorName = 'SomeTextCode' | 'UnauthorizedException'

type ErrorResponse = {
  data: {
    error: string
    errorName: ErrorName
    path: string
    statusCode: number
    timestamp: string
  }
  status: number
}

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'status' in obj &&
    obj.status === 401 &&
    'data' in obj &&
    typeof obj.data === 'object' &&
    obj.data !== null &&
    'error' in obj.data &&
    typeof obj.data.error === 'string'
  )
}
