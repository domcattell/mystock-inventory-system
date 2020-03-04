import React, { useContext } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom'

import {AuthContext} from '../../contexts/auth.context'

import useToggle from '../../hooks/useToggle';

import AddProduct from '../../components/modals/AddProduct';
import AddCategory from '../../components/modals/AddCategory';

import '../../styles/Navbar.scss'

const Navbar = (props) => {
    const {logoutUser} = useContext(AuthContext)
    const [addProductShowing, toggleAddProduct] = useToggle(false);
    const [addCategoryShowing, toggleAddCategory] = useToggle(false);

    const logout = () => {
        logoutUser();
    }

    return (
        <nav className={props.visible ? "navbarRoot open" : "navbarRoot"}>
            <ul className="navbarUl">
                <li className="navbarItem">
                    <NavLink to="/dashboard" className="navbarLink">
                        <i className="fas fa-tachometer-alt"></i>Dashboard
                    </NavLink>
                </li >
                <li className="navbarItem">
                    <NavLink to="/products/all" className="navbarLink">
                        <i className="fas fa-th"></i>Products
                    </NavLink>
                </li>
                <li className="navbarItem">
                    <NavLink to="/categories/all" className="navbarLink">
                        <i className="fas fa-box-open"></i>Categories
                    </NavLink>
                </li>
                <li onClick={toggleAddProduct} className="navbarItem">
                    <Link className="navbarLink">
                        <i className="fas fa-cart-plus"></i>Add Product
                    </Link>
                </li>
                <li onClick={toggleAddCategory} className="navbarItem">
                    <Link className="navbarLink">
                        <i className="fas fa-plus"></i>Add Category
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink" onClick={logout}>
                        <i className="fas fa-sign-out-alt"></i>Sign Out
                    </Link>
                </li>
            </ul>
            <AddProduct show={addProductShowing} onHide={toggleAddProduct}/>
            <AddCategory show={addCategoryShowing} onHide={toggleAddCategory}/>
        </nav>
    );
}

export default Navbar;
