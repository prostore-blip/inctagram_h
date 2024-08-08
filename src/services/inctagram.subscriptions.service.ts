import { inctagramService } from '@/services/inctagram.service'

export const inctagramUserSubscriptionsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getMySubscriptions: builder.query<any, void>({
        query: () => {
          return { url: `/v1/subscriptions/my-payments` }
        },
      }),
    }
  },
})

export const { useGetMySubscriptionsQuery } = inctagramUserSubscriptionsService
