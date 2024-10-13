import { inctagramService } from '@/services/inctagram.service'
import {
  ResponseAllSubscriptionsType,
  ResponseCostOfPaymentSubscriptionsType,
  ResponseCurrentSubscriptionType,
} from '@/services/types'

export const inctagramUserSubscriptionsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getCancelAutorenevalSubscription: builder.mutation<void, void>({
        invalidatesTags: ['currentSubscrioption'],
        query: () => {
          return { method: 'POST', url: `/v1/subscriptions/canceled-auto-renewal` }
        },
      }),
      getCostOfPaymentSubscriptions: builder.query<ResponseCostOfPaymentSubscriptionsType, void>({
        query: () => {
          return { url: `/v1/subscriptions/cost-of-payment-subscriptions` }
        },
      }),
      getMyAllSubscriptions: builder.query<ResponseAllSubscriptionsType, void>({
        query: () => {
          return { url: `/v1/subscriptions/my-payments` }
        },
      }),
      getMyCurrentSubscription: builder.query<ResponseCurrentSubscriptionType, void>({
        providesTags: ['currentSubscrioption'],
        query: () => {
          return { url: `/v1/subscriptions/current-payment-subscriptions` }
        },
      }),
    }
  },
})

export const {
  useGetCancelAutorenevalSubscriptionMutation,
  useGetCostOfPaymentSubscriptionsQuery,
  useGetMyAllSubscriptionsQuery,
  useGetMyCurrentSubscriptionQuery,
} = inctagramUserSubscriptionsService
