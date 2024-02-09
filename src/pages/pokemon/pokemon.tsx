import React, { FC, useContext, useEffect, useState } from 'react'
import './pokemon.css'
import { Link, useLocation } from 'react-router-dom';
import { PokemonContext, PokemonDispatchContext } from '../../contexts/pokemonCollection';
import { AuthContext } from '../../contexts/auth';
import { catchPokemon } from '../../api/pokemons';

const Pokemon: FC = ({ }): JSX.Element => {

    const authContext = useContext(AuthContext);
    const dispatch = useContext(PokemonDispatchContext);
    const pokemonContext = useContext(PokemonContext);

    // get location data passed in state
    let data = useLocation();

    // pokemon state
    const [pokemon, setPokemon] = useState<any>();

    // fetch pokemon data on mount
    useEffect((): (() => void) | undefined => {
        if (!data.state.accessUrl) return;

        (async () => {
            const pokemonData = await fetch(data.state.accessUrl);
            const result = await pokemonData.json();
            if (result) {
                const pokemonCopy = {
                    id: result.id,
                    name: result.name,
                    abilities: result.abilities.filter((ability: any) => ability.is_hidden == false),
                    height: result.height,
                    weight: result.weight,
                    // did not find image about the pokemon in the response
                }
                setPokemon(pokemonCopy)
            }
        })();
    }, [data.state.accessUrl])


    async function handleButtonClick() {
        if (!authContext?.id) return;

        const responseData = await catchPokemon({ userId: authContext.id, pokemonId: pokemon.id })
        console.log(responseData)
        dispatch && dispatch({
            type: 'catch',
            userPokemons: responseData.pokemons.pokemons
        })
    }

    const pokemonIsCaptured = pokemonContext?.userPokemons?.find((userPokemon) => Number(userPokemon.id) === pokemon?.id);
    const actionButtonText = pokemonIsCaptured ? "Release" : "Catch!"

    return (
        <main className='pokemon-page'>
            <Link to={"/"} >Back to main page</Link>
            <section>
                <div className='image-wrapper' style={{ border: `${pokemonIsCaptured ? "2px solid green" : "none"}` }}>
                    <img src="https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_1280.png" />
                </div>
                <div className='content-wrapper'>
                    <h1>Name: {pokemon?.name}</h1>
                    <p>Height: {pokemon?.height}</p>
                    <p>Weight: {pokemon?.weight}</p>
                    <button onClick={handleButtonClick} >{actionButtonText}</button>
                </div>
            </section>
        </main>
    )
}
export default Pokemon