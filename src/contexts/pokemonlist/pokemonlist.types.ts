export interface PokemonListContextType {
    search: string | null,
    filter: string | null,
    collection: "all" | "user",
    showSelected: "all" | "selected",
    selected: number[],
}

export type PokemonListActionTypeType = "search" | "filter" | "collection" | "select" | "deselect"

export type PokemonListActionPayloadType = {
    search?: string | null,
    filter?: string | null,
    collection?: "all" | "user",
    showSelected?: "all" | "selected",
    pokemonId?: number,
}

export interface PokemonListActionType {
    type: PokemonListActionTypeType,
    payload: PokemonListActionPayloadType
}