import { inctagramService } from '@/services/inctagram.service'
import { ResponseAllSessionsType } from '@/services/types'

export const inctagramSessionsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAllSessions: builder.mutation<void, void>({
        query: () => {
          return { method: 'DELETE', url: '/v1/sessions/terminate-all' }
        },
      }),
      getAllSessions: builder.query<ResponseAllSessionsType, void>({
        query: () => '/v1/sessions',
      }),
    }
  },
})
export const { useDeleteAllSessionsMutation, useGetAllSessionsQuery } = inctagramSessionsService
