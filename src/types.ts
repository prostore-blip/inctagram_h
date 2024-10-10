import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export type ErrorData = {
  error: string
  messages: { field: string; message: string }[]
  statusCode: number
}

export type FormError = {
  data: ErrorData
}

export function isErrorWithData(obj: unknown): obj is FormError {
  return typeof obj === 'object' && obj !== null && 'data' in obj
}

export function isFormErrorData(obj: unknown): obj is ErrorData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'statusCode' in obj &&
    typeof obj.statusCode === 'number' &&
    'messages' in obj &&
    Array.isArray(obj.messages) &&
    'error' in obj &&
    typeof obj.error === 'string'
  )
}

export function isFormError(obj: unknown): obj is FormError {
  return isErrorWithData(obj) && isFormErrorData(obj.data)
}

export type FetchBaseQueryErrorData = {
  error: string
  errorName: string
  path: string
  statusCode: number
  timestamp: string
}

export function isFetchBaseQueryErrorData(obj: any): obj is FetchBaseQueryErrorData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.statusCode === 'number' &&
    typeof obj.timestamp === 'string' &&
    typeof obj.error === 'string' &&
    typeof obj.path === 'string' &&
    typeof obj.errorName === 'string'
  )
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    (typeof (error as FetchBaseQueryError).status === 'number' ||
      (error as FetchBaseQueryError).status === 'FETCH_ERROR' ||
      (error as FetchBaseQueryError).status === 'PARSING_ERROR' ||
      (error as FetchBaseQueryError).status === 'CUSTOM_ERROR') &&
    'data' in error &&
    isFetchBaseQueryErrorData(error.data)
  )
}

//WIP api response
export type UnsuccessfulRequestResult = { message: string; statusCode: number }

export function isUnsuccessfulRequestResult(
  error: unknown
): error is { data: UnsuccessfulRequestResult } {
  return (
    isErrorWithData(error) &&
    'statusCode' in error.data &&
    typeof error.data.statusCode === 'number'
  )
}

export type SuccessfulRequestResult = { message: string; success: true }
