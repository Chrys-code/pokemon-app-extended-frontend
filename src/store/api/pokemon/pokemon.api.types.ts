export interface Pokemon {
    id: number,
    name: string,
    weight: number,
    height: number,
    abilities: string[],
    types: string[],
    image: string,
    url: string,
}

export type PokemonList = { [key: string]: Pokemon };

export interface PokemonApiResponse {
    pokemons: PokemonList,
    pokemonTypes: string[],
    message?: string,
    success: boolean,
}