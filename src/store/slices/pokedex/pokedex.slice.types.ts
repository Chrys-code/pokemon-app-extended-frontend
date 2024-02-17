export type PokemonBase = {
    weight: number,
    height: number,
    abilities: string[]
}

export interface Pokemon {
    _id?: string,
    pokemonId: string,
    name: string,
    base: PokemonBase
}

export interface PokedexState {
    pokemon: Pokemon[]
}
