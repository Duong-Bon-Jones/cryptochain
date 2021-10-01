import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "42b26d88c1msh3aa7580cd1429b4p126943jsn2855c02d7408",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptosDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptosHistory: builder.query({
            query: ({ coinId, timePeriod }) =>
                createRequest(`/coin/${coinId}/history/${timePeriod}`),
        }),
        getCryptosExchange: builder.query({
            query: () => createRequest(`/exchanges`),
        }),
    }),
    refetchOnReconnect: true,
});

export const {
    useGetCryptosQuery,
    useGetCryptosHistoryQuery,
    useGetCryptosDetailsQuery,
    useGetCryptosExchangeQuery,
} = cryptoApi;
