import React, {  useContext } from 'react';

import { AuthContext } from '../../contexts/auth.context';

import useToggle from '../../hooks/useToggle'

import Navbar from './Navbar'

import '../../styles/Menubar.scss'

const Menubar = () => {

    const { currentUser } = useContext(AuthContext)
    const [navState, navToggle] = useToggle(true)

    return (
        <div className="hellore">
            <div className="menubarRoot">
                <div onClick={navToggle} className="menubarToggle">
                    <i className="fas fa-bars"></i>
                </div>
                <div className="menubarLogo">
                    <h2>myStock</h2>
                </div>
                <div className="menubarUser">
                    <i className="fas fa-user"></i>
                    <h2>{currentUser}</h2>
                </div>
            </div>
            <Navbar visible={navState} />
        </div>
    );
}

export default Menubar;
