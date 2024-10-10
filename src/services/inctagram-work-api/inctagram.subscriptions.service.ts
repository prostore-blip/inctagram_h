import { inctagramWorkApiService } from '@/services/inctagram-work-api/inctagram.service'

export const inctagramUserSubscriptionsService = inctagramWorkApiService.injectEndpoints({
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
