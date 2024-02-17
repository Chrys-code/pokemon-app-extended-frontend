import React, { FC, useContext, useEffect, useState } from 'react'
import './list.css';
import { useFetchPokedexQuery } from '../../store/api/pokedex/pokedex.api';
import ListItem from '../listItem/listItem';
import { PokemonList } from '../../store/api/pokedex/pokedex.api.types';
import { PokemonListContext } from '../../contexts/pokemonlist';
import { filterByCollection, filterBySearch, filterByType } from './helpers';
import { useFetchPokemonsQuery } from '../../store/api/pokemon/pokemon.api';


const List: FC = (): JSX.Element => {

    const { data: pokemonsData, isFetching: isPokemonsFetching } = useFetchPokemonsQuery();
    const { data: pokedexData, isFetching: isPokedexFetching } = useFetchPokedexQuery();
    const pokemonListContext = useContext(PokemonListContext);
    const [pokemons, setPokemons] = useState<PokemonList>({});

    // Filter PokemonList
    useEffect((): (() => void) | undefined => {
        if (!pokemonsData) return;
        if (!pokedexData) return;
        if (!pokemonListContext) { setPokemons(pokemonsData.pokemons); return; };

        const filteredByCollection = filterByCollection(pokemonsData.pokemons, pokedexData.pokemons, pokemonListContext.collection);
        const filteredByType = filterByType(filteredByCollection, pokemonListContext.filter)
        const filterResult = filterBySearch(filteredByType, pokemonListContext.search)

        setPokemons(filterResult);
    }, [pokemonsData, pokedexData, pokemonListContext])


    /**
     * Handles rendering a list of items for pokemon list
     * @param pokemons - PokemonList containing all pokemons
     * @returns - JSX.Element list or null if pokedex is undefined
     */
    function renderPokemonList(pokemons: PokemonList | undefined): JSX.Element[] | null {
        if (!pokemons) return null;
        return pokemons && Object.keys(pokemons).map((key: string) => {
            const pokemon = pokemons[Number(key)];
            return <ListItem key={pokemon.id} pokemon={pokemon} />
        })
    };

    const loading = isPokemonsFetching || isPokedexFetching;

    return (
        <section className='pokemon-list-container'>
            <ul className='pokemon-list'>
                {
                    loading ? <h1 style={{ alignSelf: 'center', justifySelf: 'center' }}>Loading...</h1> : renderPokemonList(pokemons)
                }
            </ul>
        </section>
    )
}
export default List