export type ErrorData = {
  error: string
  messages: { field: string; message: string }[]
  statusCode: number
}

export type FormError = {
  data: ErrorData
}

export function isFormErrorData(obj: unknown): obj is ErrorData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'statusCode' in obj &&
    typeof obj.statusCode === 'number' &&
    'messages' in obj &&
    Array.isArray(obj.messages) &&
    // obj.messages.every(
    //   (msg: any) =>
    //     typeof msg === 'object' &&
    //     msg !== null &&
    //     typeof msg.message === 'string' &&
    //     typeof msg.field === 'string'
    // ) &&
    'error' in obj &&
    typeof obj.error === 'string'
  )
}

export function isFormError(obj: unknown): obj is FormError {
  return typeof obj === 'object' && obj !== null && 'data' in obj && isFormErrorData(obj.data)
}
