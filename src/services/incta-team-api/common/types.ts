import { ErrorData } from '@/types'

export type FormFieldError = {
  field: string
  message: string
}

export type FormDataErrorResponse = {
  errorsMessages: FormFieldError[]
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
