export interface Pokemon {
    pokemonId: string,
    name: string,
    url: string
}

export interface DBPokemon extends Pokemon {
    _id: string,
}