export type UserPokemon = { id: string }
export type UserPokemons = { id: string }[]


export interface PokemonContext {
    userPokemons: UserPokemons,
    allPokemons: any[]
}

export interface PokemonContextActions {
    type: PokemonActions,
    pokemonId: string | undefined,
    allPokemons: any[] | undefined,
    userPokemons: UserPokemons | undefined
}
export type PokemonActions = "catch" | "release" | "init"