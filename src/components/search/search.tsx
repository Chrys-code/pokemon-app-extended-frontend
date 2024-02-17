import React, { FC, useContext, useState } from 'react'
import './search.css'
import { useDebounce } from '../../utils/hooks/useDebounce';
import { PokemonListDispatchContext } from '../../contexts/pokemonlist';

const Search: FC = (): JSX.Element => {

    const [search, setSearch] = useState<string>();
    const dispatch = useContext(PokemonListDispatchContext);

    function handleSearch(): void {
        dispatch && dispatch({
            type: 'search',
            payload: {
                search: search
            }
        })
    }

    useDebounce(handleSearch, 600, [search]);

    return (
        <div className='search-container'>
            <input onChange={e => setSearch(e.target.value)} type="text" placeholder='search for a pokemon...' />
        </div>
    )
}
export default Search