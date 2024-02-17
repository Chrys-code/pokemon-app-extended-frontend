import React, { FC, PropsWithChildren } from 'react'
import './pokemonDetails.css'
import { PokemonDetailsProps } from './pokemonDetails.types'
import { useAddToPokedexMutation, useFetchPokedexQuery, useRemoveFromPokedexMutation } from '../../store/api/pokedex/pokedex.api'

const PokemonDetails: FC<PokemonDetailsProps> = ({ pokemon }: PropsWithChildren<PokemonDetailsProps>): JSX.Element => {

    const [addToPokedex, { isLoading: addIsLoading }] = useAddToPokedexMutation();
    const [removeFromPokedex, { isLoading: removeIsLoading }] = useRemoveFromPokedexMutation();
    const { data, isFetching } = useFetchPokedexQuery();

    function handleClick(isCaptured: boolean): void {
        if (isCaptured) {
            removeFromPokedex(pokemon.id)
        } else {
            addToPokedex(pokemon.id);
        }
    }

    const pokemonIsCaptured: boolean = !!data?.pokemons.find((pokemonId) => pokemonId === pokemon.id);
    const loading = addIsLoading || removeIsLoading || isFetching;
    const actionButtonText = pokemonIsCaptured ? "Release" : "Catch!"

    return (
        <>
            <section className='pokemon-info-container'>
                <picture className='pokemon-image-wrapper' style={{ border: pokemonIsCaptured ? "2px solid green" : 'none' }}>
                    <img src={pokemon.image} alt="pokemon image" />
                </picture>
                <div className='pokemon-info-wrapper'>
                    <h2>{pokemon.name}</h2>
                    <span>Height: {pokemon.height}</span>
                    <span>Weight: {pokemon.weight}</span>
                    <span>Abilities: {pokemon.abilities?.join(", ")}</span>
                    <span>Types: {pokemon.types?.join(", ")}</span>
                </div>
            </section>
            {
                loading ? <p>Loading...</p> : <button onClick={() => handleClick(pokemonIsCaptured)} >{actionButtonText}</button>
            }
        </>
    )
}
export default PokemonDetails