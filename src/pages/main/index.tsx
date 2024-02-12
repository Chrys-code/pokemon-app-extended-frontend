import React, { FC } from 'react'
import './main.css'
import List from '../../components/list/list'

const MainPage: FC = ({ }): JSX.Element => {
    return (
        <main className='main-page'>
            <h1>Pokemons</h1>
            <List />
        </main>
    )
}
export default MainPage