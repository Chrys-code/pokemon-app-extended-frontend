import React, { FC, useContext } from 'react'
import { PokemonListContext, PokemonListDispatchContext } from '../../contexts/pokemonlist';

const Userselect: FC = (): JSX.Element => {

    const pokemonListContext = useContext(PokemonListContext);
    const dispatch = useContext(PokemonListDispatchContext);

    function handleClick() {
        dispatch && dispatch({
            type: 'collection',
            payload: {
                collection: pokemonListContext?.collection == "all" ? "user" : "all"
            }
        })
    }

    const actionButtonText = pokemonListContext?.collection == "all" ? "All" : "Mine"

    return (
        <label htmlFor='userpokemons' > Collection:
            <button onClick={handleClick}> {actionButtonText} </button>
        </label>
    )
}
export default Userselect