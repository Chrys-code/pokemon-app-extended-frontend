import React, { FC } from 'react'
import './searchbar.css'
import Search from '../search/search'
import Filter from '../filter/filter'
import Userselect from '../userselect/userselect'

const Searchbar: FC = (): JSX.Element => {
    return (
        <section className='searchbar-container'>
            <div className='searchbar-wrapper' >
                <Search />
                <Filter />
                <Userselect />
            </div>
        </section>
    )
}
export default Searchbar;