import React, { FC, PropsWithChildren, memo } from 'react'
import './listItem.css'
import { ListItemProps } from './listItem.types'
import { Link } from 'react-router-dom';

const ListItem: FC<ListItemProps> = ({ pokemon, isCaptured, isSelected, handleSelect }: PropsWithChildren<ListItemProps>): JSX.Element => {

    const { id, name, types } = pokemon;

    const actionText = isSelected ? "Deselect" : "Select"

    return (
        <li className={`pokemon-list-item ${isSelected ? 'item-selected' : null} ${isCaptured ? 'pokemon-captured' : null}`} key={id} style={{}}>
            <div className='list-item-details'>
                <h2>{name}</h2>
                <p>{types.join(", ")}</p>
            </div>
            <button onClick={() => handleSelect(id)}>
                {actionText}
            </button>
            <Link className='list-item-link' to={`/pokemon?id=${id}`} >
                <span>See info</span>
            </Link>
        </li>
    )
}
export default memo(ListItem)