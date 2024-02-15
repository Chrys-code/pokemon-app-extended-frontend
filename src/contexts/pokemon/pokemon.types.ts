export type Pokemon = { _id: string, pokemonId: string, url: string, name: string }
export type Pokedex = Pokemon[]

export type ApiPokemon = { name: string, url: string }
export type ApiPokemons = ApiPokemon[]

export interface Pokemons {
    pokedex: Pokedex,
    allPokemons: ApiPokemons
}

export interface PokemonActions {
    type: PokemonActionTypes,
    payload?: {
        allPokemons?: ApiPokemons,
        pokedex?: Pokedex
    }
}

export type PokemonActionTypes = "catch" | "release" | "init"