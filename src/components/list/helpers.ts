import { PokemonList } from "../../store/api/pokedex/pokedex.api.types";

/**
 * Filters all pokemons in pokemon type by selected type
 * @param pokemons 
 * @param types 
 * @returns 
 */
export function filterByType(pokemons: PokemonList, type: string | null): PokemonList {
    if (type == null) return pokemons;
    const filtered = Object.keys(pokemons).filter((key: string) => pokemons[key].types.find((pokemonType: string) => type.includes(pokemonType)))
        .reduce((obj: PokemonList, key) => {
            obj[key] = pokemons[key];
            return obj;
        }, {});

    return filtered;
}

/**
 * Filters all pokemons in name by search string
 * @param pokemons - PokemonList as object literal
 * @param search - Search phrase as string
 * @returns - PokemonList
 */
export function filterBySearch(pokemons: PokemonList, search: string | null): PokemonList {
    if (search == null) return pokemons;
    const filtered = Object.keys(pokemons).filter(key => pokemons[key].name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        .reduce((obj: PokemonList, key) => {
            obj[key] = pokemons[key];
            return obj;
        }, {});

    return filtered;
}

/**
 * Filters PokemonList by all or user collection
 * @param pokemons - PokemonList
 * @param collection - User's collection
 * @returns - PokemonList
 */
export function filterByCollection(pokemons: PokemonList, collection: number[] | null, collectionType: "user" | "all"): PokemonList {
    if (collectionType == "all") return pokemons;
    if (collection == null) return pokemons;
    const filtered = Object.keys(pokemons)
        .filter(key => collection.includes(Number(key)))
        .reduce((obj: PokemonList, key) => {
            obj[key] = pokemons[key];
            return obj;
        }, {});

    return filtered;
}