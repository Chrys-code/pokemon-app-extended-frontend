import React, { FC, PropsWithChildren } from 'react'
import './main.css'
import List from '../../components/list/list'

const MainPage: FC = ({ }: PropsWithChildren): JSX.Element => {
    return (
        <main className='page'>
            <h2>Pokemons</h2>
            <List />
        </main>
    )
}
export default MainPage