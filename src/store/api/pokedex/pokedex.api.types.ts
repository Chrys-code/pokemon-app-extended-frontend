import { Pokemon } from "../pokemon/pokemon.api.types";

export type UserPokemons = number[];

export type PokemonList = { [key: string]: Pokemon };

export interface PokedexApiResponse {
    pokemons: UserPokemons,
    message?: string,
    success: boolean,
}