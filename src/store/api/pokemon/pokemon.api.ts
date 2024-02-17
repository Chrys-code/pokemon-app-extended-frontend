import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonApiResponse } from './pokemon.api.types';

const endpoint = `${process.env.REACT_APP_API}/pokemons`

export const pokemonsApiSlice = createApi({
    reducerPath: 'pokemons',
    baseQuery: fetchBaseQuery({
        baseUrl: `${endpoint}`,
    }),
    tagTypes: ['pokemons'],
    endpoints(builder) {
        return {
            fetchPokemons: builder.query<PokemonApiResponse, void>({
                query() {
                    return '/'
                },
                providesTags: ["pokemons"]
            }),
        }
    }
})

export const {
    useFetchPokemonsQuery,
} = pokemonsApiSlice;