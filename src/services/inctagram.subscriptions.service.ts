import { inctagramService } from '@/services/inctagram.service'
import {
  RequestCreateSubscriptionType,
  ResponseAllSubscriptionsType,
  ResponseCostOfPaymentSubscriptionsType,
  ResponseCreateSubscriptionType,
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
      getCreateSubscription: builder.mutation<
        ResponseCreateSubscriptionType,
        RequestCreateSubscriptionType
      >({
        invalidatesTags: ['currentSubscrioption'],
        query: body => {
          return { body, method: 'POST', url: `/v1/subscriptions` }
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
  useGetCreateSubscriptionMutation,
  useGetMyAllSubscriptionsQuery,
  useGetMyCurrentSubscriptionQuery,
} = inctagramUserSubscriptionsService
