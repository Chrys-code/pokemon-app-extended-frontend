import React, { FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import './list.css';
import { PokemonContext } from '../../contexts/pokemon';
import { Link } from 'react-router-dom';
import Search from '../search/search';
import { ApiPokemon, ApiPokemons, Pokemon, Pokedex } from '../../contexts/pokemon/pokemon.types';

const List: FC = ({ }: PropsWithChildren): JSX.Element => {

    // get pokemons from context
    const pokemonsContext = useContext(PokemonContext);

    // Get User & Api pokemons
    const [searchableUserPokemons, setSearchableUserPokemons] = useState<Pokedex | null>(null);
    const [searchableAPIPokemons, setSearchableAPIPokemons] = useState<ApiPokemons | null>(null);

    // Search result for either user or api pokemons
    const [searchResult, setSearchResult] = useState<any | null>(null);

    // Browse collection state; uer or api pokemons
    const [collection, setCollection] = useState<boolean>(false);

    // Set searchable collections from context
    useEffect((): (() => void) | undefined => {
        if (!pokemonsContext) return;
        setSearchableAPIPokemons(pokemonsContext?.allPokemons);
        setSearchableUserPokemons(pokemonsContext.pokedex);
    }, [pokemonsContext])

    // Reset serach on collection change
    useEffect((): (() => void) | undefined => {
        if (collection) { setSearchResult(searchableUserPokemons); return; }
        if (!collection) { setSearchResult(searchableAPIPokemons); return; }
    }, [collection])


    /**
     * Handles search initiated from search
     * @param value - value from search input
     * @param collection - users collection or all pokemons
     * @returns void
     */
    function handleSearch(value: string | null, collection: boolean): void {
        if (collection) {
            if (value) {
                let filteredResults = searchableUserPokemons?.filter((pokemon: Pokemon) => pokemon.name.includes(value)) || [];
                setSearchResult(filteredResults);
                return;
            }
            setSearchResult(searchableUserPokemons);
            return;
        } else {
            if (value) {
                let filteredResults = searchableAPIPokemons?.filter((pokemon: ApiPokemon) => pokemon.name.includes(value)) || [];
                setSearchResult(filteredResults);
                return;
            }
            setSearchResult(searchableAPIPokemons);
            return;
        }
    }

    return (
        <>
            <Search onCollectionChange={setCollection} isCollectionChecked={collection} onSearch={v => handleSearch(v, collection)} />
            <ul className='list'>
                {searchResult && searchResult.map((pokemon: Pokemon | ApiPokemon, i: number) => {
                    return (
                        <li key={i}>
                            <Link to="/pokemon" state={{ accessUrl: pokemon.url }}>
                                <p>{pokemon.name}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default List