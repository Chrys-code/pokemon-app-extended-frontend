import React, { FC, useContext } from 'react'
import { PokemonListDispatchContext } from '../../contexts/pokemonlist';
import { useFetchPokemonsQuery } from '../../store/api/pokemon/pokemon.api';

const Filter: FC = (): JSX.Element => {

    const { data, isFetching } = useFetchPokemonsQuery();
    const dispatch = useContext(PokemonListDispatchContext);

    function handleChange(value: string): void {
        dispatch && dispatch({
            type: 'filter',
            payload: {
                filter: value == "all" ? null : value
            }
        })
    }

    return (
        <div>
            Select Type:
            {
                isFetching ? <span>Loading...</span> :
                    <select className='filter-type' onChange={e => handleChange(e.target.value)}>
                        {
                            data && data.pokemonTypes.map((type: string) => (
                                <option value={type} key={type}>
                                    {type}
                                </option>
                            ))
                        }
                        <option value={undefined}>
                            all
                        </option>
                    </select>
            }
        </div>

    )
}
export default Filter