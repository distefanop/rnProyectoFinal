import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: ({ localId, order }) => ({
                url: `orders/${localId}.json`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Orders']
        }),
        getOrders: builder.query({
            query: (localId) => `orders/${localId}.json`,
            transformResponse: (response) => {
                if (!response) {
                    return [];
                }
                const ordersArray = Object.keys(response).map(key => ({
                    id: key,
                    ...response[key]
                }));
                return ordersArray;
            },
            providesTags: ['Orders']
        })
    })
})

export const { usePostOrderMutation, useGetOrdersQuery } = ordersApi