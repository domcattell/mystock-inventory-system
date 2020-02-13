import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom'
import '../styles/Navbar.scss'
import {AuthContext} from '../contexts/auth.context'

const Navbar = (props) => {
    const {logoutUser} = useContext(AuthContext)

    const logout = () => {
        logoutUser();
    }

    return (
        <nav className={props.visible ? "navbarRoot open" : "navbarRoot"}>
            <ul className="navbarUl">
                <li className="navbarItem">
                    <Link className="navbarLink">
                        <a><i class="fas fa-tachometer-alt">
                        </i>Dashboard</a>
                    </Link>
                </li >
                <li className="navbarItem">
                    <Link to="/products/all" className="navbarLink">
                        <a><i class="fas fa-box-open">
                        </i>Products</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink">
                        <a><i class="fas fa-list-alt">
                        </i>Categories</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink">
                        <a><i class="fas fa-list-alt">
                        </i>Add Product</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink">
                        <a><i class="fas fa-list-alt">
                        </i>Add Category</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink" onClick={logout}>
                        <a><i class="fas fa-list-alt">
                        </i>Sign Out</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
