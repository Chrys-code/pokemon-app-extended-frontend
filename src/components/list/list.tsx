import React, { FC, PropsWithChildren, useContext } from 'react'
import './list.css';
import { PokemonContext } from '../../contexts/pokemonCollection';
import { Link } from 'react-router-dom';

const List: FC = ({ }: PropsWithChildren): JSX.Element => {

    // get pokemons from context
    const pokemonsContext = useContext(PokemonContext);

    return (
        <ul className='list'>
            {
                pokemonsContext && pokemonsContext.allPokemons?.map((pokemon, i) => {
                    return (
                        <li key={i}>
                            <Link to="/pokemon" state={{ accessUrl: pokemon.url }}>
                                <p>{pokemon.name}</p>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default List