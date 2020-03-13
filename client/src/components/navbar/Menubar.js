import React, { useContext } from 'react';

import { AuthContext } from '../../contexts/auth.context';

import useToggle from '../../hooks/useToggle'

import Navbar from './Navbar'
import Search from '../tools/Search';

import '../../styles/navbar/Menubar.scss'

const Menubar = () => {

    const { currentUser } = useContext(AuthContext)
    const [navState, navToggle] = useToggle(true)

    return (
        <div className="Menubar__root">
            <div className="Menubar">
                <button onClick={navToggle} className="Menubar__toggle-btn">
                    <i className="fas fa-bars Menubar__toggle-icon"></i>
                </button>
                <h2 className="Menubar__header">myStock</h2>
                <div className="Menubar__usr-wrapper">
                    <i className="fas fa-user Menubar__usr-icon"></i>
                    <h2 className="Menubar__usr-wrapper__header">{currentUser}</h2>
                </div>
            </div>
            <Navbar visible={navState} />
        </div>
    );
}

export default Menubar;
