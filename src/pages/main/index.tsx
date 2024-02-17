import React, { FC } from 'react'
import './main.css'
import List from '../../components/list/list'
import { useFetchPokedexQuery } from '../../store/api/pokedex/pokedex.api';

const MainPage: FC = ({ }): JSX.Element => {

    // get pokemons
    const { data, isFetching } = useFetchPokedexQuery();

    if (isFetching) return (
        <>
            <h1>Loading...</h1>
        </>
    )

    console.log(data)

    return (
        <main className='main-page'>
            <h1>Pokemons</h1>
            <List />
        </main>
    )
}
export default MainPage