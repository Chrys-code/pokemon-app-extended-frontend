import React, { FC, useContext, useRef, useState } from 'react'
import './searchbar.css'
import { useFetchPokemonsQuery } from '../../store/api/pokemon/pokemon.api';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { PokemonListContext, PokemonListDispatchContext } from '../../contexts/pokemonlist';

const Searchbar: FC = (): JSX.Element => {

    const pokemonListContext = useContext(PokemonListContext);
    const dispatch = useContext(PokemonListDispatchContext);
    const [inputCounter, setInputCounter] = useState<number>(0);
    const { data, isFetching } = useFetchPokemonsQuery(pokemonListContext?.limit || 20);
    const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // @ts-ignore
        const formData = new FormData(e.target);

        if (formData.get("collection") == null) {
            formData.set("collection", "all")
        }
        if (formData.get("showSelected") == null) {
            formData.set("showSelected", "all")
        }
        if (formData.get("filter") == "all") {
            formData.delete("filter")
        }

        dispatch && dispatch({
            type: 'filter',
            payload: {
                search: formData.get("search") ? String(formData.get("search")) : null,
                filter: formData.get("filter") ? String(formData.get("filter")) : null,
                collection: String(formData.get("collection")) as "user" | "all",
                showSelected: String(formData.get("showSelected")) as "selected" | "all",
                limit: Number(formData.get("limit"))
            }
        })
    }

    useDebounce(triggerFormSubmit, 600, [inputCounter]);

    function triggerFormSubmit() {
        if (formRef.current) formRef.current.requestSubmit();
    }

    const limit = Array.from([20, 50, 100]);

    return (
        <section className='searchbar-container'>
            <form ref={formRef} className='searchbar-wrapper' onSubmit={handleSubmit} onChange={() => setInputCounter(inputCounter + 1)} >
                <label htmlFor='search'>Search:
                    <input name="search" type="text" placeholder='search for a pokemon...' />
                </label>
                {isFetching ? <span>Loading...</span> :
                    <label htmlFor='filter'> Type:
                        <select name='filter' className='filter-type' defaultValue="all">
                            {
                                data && data.pokemonTypes.map((type: string) => (
                                    <option value={type} key={type}>
                                        {type}
                                    </option>
                                ))
                            }
                            <option value="all">
                                all
                            </option>
                        </select>
                    </label>
                }

                <label htmlFor='limit'> Limit:
                    <select name='limit' className='filter-type' defaultValue="20">
                        {
                            limit && limit.map((limit: number) => (
                                <option value={limit} key={limit}>
                                    {limit}
                                </option>
                            ))
                        }
                        <option value="all">
                            all
                        </option>
                    </select>
                </label>
                <label htmlFor='showSelected' > Show selected:
                    <input type='checkbox' value='selected' name='showSelected' />
                </label>
                <label htmlFor='userpokemons' > Collection:
                    <input type='checkbox' value='user' name='collection' />
                </label>
            </form>
        </section>
    )
}
export default Searchbar;