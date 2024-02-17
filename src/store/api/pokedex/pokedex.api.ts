import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DBPokemon, Pokemon } from './pokedex.api.types';
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
    endpoints(builder) {
        return {
            fetchPokedex: builder.query<DBPokemon, void>({
                query() {
                    return '/list'
                }
            }),
            addToPokedex: builder.mutation<DBPokemon[], string>({
                query: pokemonId => ({
                    url: '/catch',
                    method: 'POST',
                    body: pokemonId
                })
            }),
            removeFromPokedex: builder.mutation<DBPokemon[], string>({
                query: pokemonId => ({
                    url: `/release/${pokemonId}`,
                    method: 'DELETE',
                })
            })
        }
    }
})

export const {
    useFetchPokedexQuery,
    useAddToPokedexMutation,
    useRemoveFromPokedexMutation
} = pokedexApiSlice;