export type UserPokemon = { id: string, url: string, name: string }
export type UserPokemons = UserPokemon[]

export type ApiPokemon = { name: string, url: string }
export type ApiPokemons = ApiPokemon[]

export interface Pokemons {
    userPokemons: UserPokemons,
    allPokemons: ApiPokemons
}

export interface PokemonActions {
    type: PokemonActionTypes,
    pokemonId?: string,
    allPokemons?: ApiPokemons,
    userPokemons?: UserPokemons
}

export type PokemonActionTypes = "catch" | "release" | "init"