import React, { FC, useEffect, useState } from 'react'
import './pokemonInfo.css'
import { useSearchParams } from "react-router-dom";
import { Pokemon } from '../../store/api/pokemon/pokemon.api.types';
import PokemonDetails from '../../components/pokemonDetails/pokemonDetails';
import { useFetchPokemonsQuery } from '../../store/api/pokemon/pokemon.api';

const PokemonInfo: FC = (): JSX.Element => {

    const [searchParams] = useSearchParams();
    const pokemonId = searchParams.get("id");

    const { data: pokemonsData, isFetching } = useFetchPokemonsQuery();
    const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);

    useEffect((): (() => void) | undefined => {
        if (!pokemonId) return;
        if (!pokemonsData?.pokemons) return;

        setPokemon(pokemonsData.pokemons[pokemonId]);
    }, [pokemonId, pokemonsData])

    if (isFetching) return <span>Loading...</span>;

    return (
        <main className='pokemon-info-page'>
            <h1>{pokemon.name}</h1>
            <PokemonDetails pokemon={pokemon} />
        </main>
    )
}
export default PokemonInfo