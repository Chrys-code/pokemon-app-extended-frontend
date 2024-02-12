import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import './search.css';
import { SearchProps } from './search.types'
import { useDebounce } from '../../utils/hooks/useDebounce';

const Search: FC<SearchProps> = ({ onCollectionChange, isCollectionChecked, onSearch }: PropsWithChildren<SearchProps>): JSX.Element => {

    const searchRef = useRef<HTMLInputElement>(null);

    // Store search value from input field
    const [searchValue, setSearchValue] = useState<string | null>(null);

    // Initiate search after .6s user stopped typing
    useDebounce(
        () => onSearch(searchValue),
        600,
        [searchValue]
    );

    // Reset input on collection change
    useEffect((): (() => void) => {
        if (searchRef.current) searchRef.current.value = '';
        setSearchValue('')
        return (): void => { }
    }, [isCollectionChecked])


    return (
        <div className='search'>
            <input ref={searchRef} id="search" name="search" placeholder='Search...' onChange={e => setSearchValue(e.target.value)} />
            <label htmlFor='collection'>Browse my collection:
                {/* onChange is just to suppress warning for now as we need toggle managed by react state*/}
                <input id="collection" name="collection" type='radio' checked={isCollectionChecked} onClick={() => onCollectionChange(!isCollectionChecked)} onChange={() => { }} />
            </label>
        </div>
    )
}
export default Search