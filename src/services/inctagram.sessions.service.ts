import { inctagramService } from '@/services/inctagram.service'

export const inctagramSessionsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAllSessions: builder.mutation<void, void>({
        query: () => {
          return { method: 'DELETE', url: '/v1/sessions/terminate-all' }
        },
      }),
    }
  },
})
