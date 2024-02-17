import React, { FC, useContext } from 'react'
import './nav.css'
import { AuthDispatchContext } from '../../contexts/auth';
import { useLocation, Location, Link } from 'react-router-dom';

const Nav: FC = (): JSX.Element => {

    const location: Location = useLocation();
    const dispatch = useContext(AuthDispatchContext);

    function handleLogout() {
        dispatch && dispatch({
            type: 'logout'
        })
    }

    const showBackButton = location.pathname.includes('pokemon')


    return (
        <header className='header'>
            <nav>
                {
                    showBackButton && <Link id="back-link" to={"/"} >Home</Link>
                }
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    )
}
export default Nav