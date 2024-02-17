import React, { FC } from 'react'
import './main.css'
import List from '../../components/list/list'
import { PokemonListProvider } from '../../contexts/pokemonlist'
import Searchbar from '../../components/searchbar/searchbar'

const MainPage: FC = (): JSX.Element => {

    return (
        <main className='main-page'>
            <h1>Pokemons</h1>
            <PokemonListProvider>
                <Searchbar />
                <List />
            </PokemonListProvider>
        </main>
    )
}
export default MainPage