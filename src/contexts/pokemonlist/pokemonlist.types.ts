export interface PokemonListContextType {
    search: string | null,
    filter: string | null,
    collection: "all" | "user"
}

export interface PokemonListActionType {
    type: "search" | "filter" | "collection",
    payload: {
        search?: string | null,
        filter?: string | null,
        collection?: "all" | "user"
    }
}