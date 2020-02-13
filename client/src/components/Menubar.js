import React, { useState, useContext, useEffect } from 'react';
import '../styles/Menubar.scss'
import Navbar from './Navbar'
import { AuthContext } from '../contexts/auth.context';
import useToggle from '../hooks/useToggle'

const Menubar = (props) => {

    const {loadUser, currentUser } = useContext(AuthContext)
    const [navState, navToggle] = useToggle(false)

    return (
        <div className="hellore">
            <div className="menubarRoot">
                <div onClick={navToggle} className="menubarToggle">
                    <i class="fas fa-bars"></i>
                </div>
                <div className="menubarLogo">
                    <h2>myStock</h2>
                </div>
                <div className="menubarUser">
                    <i class="fas fa-user"></i>
                    <h2>{currentUser}</h2>
                </div>
            </div>
            <Navbar visible={navState} />
        </div>
    );
}

export default Menubar;
