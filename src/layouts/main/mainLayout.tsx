import React, { FC } from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../../components/nav/nav';

const MainLayout: FC = ({ }): JSX.Element => {

    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}
export default MainLayout