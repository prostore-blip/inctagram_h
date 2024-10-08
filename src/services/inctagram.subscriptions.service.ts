import { inctagramService } from '@/services/inctagram.service'
import { ResponseAllSubscriptionsType, ResponseCurrentSubscriptionType } from '@/services/types'

export const inctagramUserSubscriptionsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getMyAllSubscriptions: builder.query<ResponseAllSubscriptionsType, void>({
        query: () => {
          return { url: `/v1/subscriptions/my-payments` }
        },
      }),
      getMyCurrentSubscription: builder.query<ResponseCurrentSubscriptionType, void>({
        query: () => {
          return { url: `/v1/subscriptions/current-payment-subscriptions` }
        },
      }),
    }
  },
})

export const { useGetMyAllSubscriptionsQuery, useGetMyCurrentSubscriptionQuery } =
  inctagramUserSubscriptionsService
