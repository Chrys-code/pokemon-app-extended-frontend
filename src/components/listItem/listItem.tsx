import React, { FC, PropsWithChildren } from 'react'
import './listItem.css'
import { ListItemProps } from './listItem.types'
import { Link } from 'react-router-dom';

const ListItem: FC<ListItemProps> = ({ pokemon }: PropsWithChildren<ListItemProps>): JSX.Element => {

    const { id, name, types } = pokemon;

    return (
        <li className='pokemon-list-item' key={id}>
            <div className='list-item-details'>
                <h2>{name}</h2>
                <p>{types.join(", ")}</p>
            </div>
            <Link className='list-item-link' to={`/pokemon?id=${id}`} >
                <span>See info</span>
            </Link>
        </li>
    )
}
export default ListItem