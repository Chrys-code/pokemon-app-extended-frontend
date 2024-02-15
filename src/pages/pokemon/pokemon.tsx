import React, { FC, useContext, useEffect, useState } from 'react'
import './pokemon.css'
import { useLocation } from 'react-router-dom';
import { PokemonContext, PokemonDispatchContext } from '../../contexts/pokemon';
import { AuthContext } from '../../contexts/auth';
import { catchPokemon, releasePokemon } from '../../api/pokedex';
import { Pokemon, Pokedex } from '../../contexts/pokemon/pokemon.types';

const PokemonPage: FC = ({ }): JSX.Element => {

    // Get user data
    const authContext = useContext(AuthContext);

    // Get pokemon data & pokemon actions
    const pokemonContext = useContext(PokemonContext);
    const dispatch = useContext(PokemonDispatchContext);

    // get location data passed in state
    let data = useLocation();

    // Single pokemon state for display
    const [pokemon, setPokemon] = useState<any>();

    // fetch pokemon data on mount
    useEffect((): (() => void) | undefined => {
        // Check for single pokemons access url
        if (!data.state.accessUrl) return;

        // Fetch and set pokemon state
        (async () => {
            // Fetch pokemon
            const pokemonData = await fetch(data.state.accessUrl);
            const result = await pokemonData.json();

            // Construct necessary pokemon data
            if (result) {
                const pokemonCopy = {
                    id: result.id,
                    name: result.name,
                    abilities: result.abilities.filter((ability: any) => ability.is_hidden == false),
                    height: result.height,
                    weight: result.weight,
                    // did not find image about the pokemon in the response
                }
                // Set pokemon state
                setPokemon(pokemonCopy)
            }
        })();
    }, [data.state.accessUrl])


    /**
     * Handles catching or releasing pokemon
     * @param pokemonIsCaptured - detect if a pokemon is in user collection and act based on that
     * @returns Promise<void>
     */
    async function handleButtonClick(pokemonIsCaptured: boolean): Promise<void> {

        // Check for user
        if (!authContext?.id) return;

        let responseData: { pokemons: Pokedex };

        const pokemonCopy: Partial<Pokemon> = {
            pokemonId: pokemon.id,
            name: pokemon.name,
            url: data.state.accessUrl
        }

        // If captured, release pokemon else catch
        if (pokemonIsCaptured) {

            const pokemonInPokedex = pokemonContext?.pokedex.find((pokemon: Pokemon) => pokemon.pokemonId == pokemonCopy.pokemonId);

            if (!pokemonInPokedex) return;

            // Fetch release pokemon api
            responseData = await releasePokemon({ pokemonId: pokemonInPokedex._id });

            dispatch && dispatch({
                type: 'release',
                payload: {
                    pokedex: responseData.pokemons
                }
            })
            return;

        } else {
            // Fetch catch pokemon api
            if (!pokemonCopy.pokemonId) return;
            // @ts-ignore
            responseData = await catchPokemon({ pokemon: pokemonCopy });

            dispatch && dispatch({
                type: 'catch',
                payload: {
                    pokedex: responseData.pokemons
                }
            })
            return;
        }
    }

    // Changing display data based on user pokemons collection
    const pokemonIsCaptured: boolean = !!pokemonContext?.pokedex?.find((userPokemon) => Number(userPokemon.pokemonId) === pokemon?.id);
    const actionButtonText: string = pokemonIsCaptured ? "Release" : "Catch!"

    return (
        <main className='pokemon-page'>
            <section>
                <div className='image-wrapper' style={{ border: `${pokemonIsCaptured ? "2px solid green" : "none"}` }}>
                    <img src="https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_1280.png" />
                </div>
                <div className='content-wrapper'>
                    <h1>Name: {pokemon?.name}</h1>
                    <p>Height: {pokemon?.height}</p>
                    <p>Weight: {pokemon?.weight}</p>
                    <button onClick={() => handleButtonClick(pokemonIsCaptured)} >{actionButtonText}</button>
                </div>
            </section>
        </main>
    )
}

export default PokemonPage