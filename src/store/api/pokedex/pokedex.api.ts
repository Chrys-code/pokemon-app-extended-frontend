import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokedexApiResponse } from './pokedex.api.types';
import Cookies from 'universal-cookie';

const endpoint = `${process.env.REACT_APP_API}/pokedex`
const react_app_domain = process.env.REACT_APP_DOMAIN || '';
const cookies = new Cookies();

export const pokedexApiSlice = createApi({
    reducerPath: 'pokedex',
    baseQuery: fetchBaseQuery({
        baseUrl: `${endpoint}`,
        prepareHeaders(headers) {
            headers.set("Access-Control-Allow-Origin", react_app_domain);
            headers.set("Authorization", cookies.get('Authorization'));
            return headers;
        }
    }),
    tagTypes: ['pokedex'],
    endpoints(builder) {
        return {
            fetchPokedex: builder.query<PokedexApiResponse, void>({
                query() {
                    return '/list'
                },
                providesTags: ["pokedex"]
            }),
            addToPokedex: builder.mutation<PokedexApiResponse, number>({
                query: pokemonId => ({
                    url: '/catch',
                    method: 'POST',
                    body: { pokemonId }
                }),
                invalidatesTags: ["pokedex"]
            }),
            removeFromPokedex: builder.mutation<PokedexApiResponse, number>({
                query: pokemonId => ({
                    url: `/release`,
                    method: 'POST',
                    body: { pokemonId }

                }),
                invalidatesTags: ["pokedex"]
            })
        }
    }
})

export const {
    useFetchPokedexQuery,
    useAddToPokedexMutation,
    useRemoveFromPokedexMutation
} = pokedexApiSlice;