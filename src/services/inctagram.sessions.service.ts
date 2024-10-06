import { inctagramService } from '@/services/inctagram.service'
import { ResponseAllSessionsType } from '@/services/types'

export const inctagramSessionsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAllSessions: builder.mutation<void, void>({
        invalidatesTags: ['getSessions'],
        query: () => {
          return { method: 'DELETE', url: '/v1/sessions/terminate-all' }
        },
      }),
      deleteSessionById: builder.mutation<void, number>({
        invalidatesTags: ['getSessions'],
        query: deviceId => {
          return { method: 'DELETE', url: `/v1/sessions/${deviceId}` }
        },
      }),
      getAllSessions: builder.query<ResponseAllSessionsType, void>({
        providesTags: ['getSessions'],
        query: () => '/v1/sessions',
      }),
    }
  },
})
export const {
  useDeleteAllSessionsMutation,
  useDeleteSessionByIdMutation,
  useGetAllSessionsQuery,
} = inctagramSessionsService
