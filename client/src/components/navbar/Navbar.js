import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom'

import { AuthActionsContext } from '../../contexts/auth.context'

import useToggle from '../../hooks/useToggle';

import AddProduct from '../../components/modals/AddProduct';
import AddCategory from '../../components/modals/AddCategory';

import '../../styles/navbar/Navbar.scss'

const Navbar = (props) => {
    const { logoutUser } = useContext(AuthActionsContext)
    const [addProductShowing, toggleAddProduct] = useToggle(false);
    const [addCategoryShowing, toggleAddCategory] = useToggle(false);

    const logout = () => {
        logoutUser();
    }

    return (
        <nav className={props.visible ? "Navbar Navbar--open" : "Navbar"}>
            <ul className="Navbar__ul">
                <li className="Navbar__item">
                    <NavLink className="Navbar__link" to="/dashboard">
                        <i className="fas fa-tachometer-alt"></i>Dashboard
                    </NavLink>
                </li >
                <li className="Navbar__item">
                    <NavLink className="Navbar__link" to="/products/all">
                        <i className="fas fa-th"></i>Products
                    </NavLink>
                </li>
                <li className="Navbar__item">
                    <NavLink className="Navbar__link" to="/categories/all">
                        <i className="fas fa-box-open"></i>Categories
                    </NavLink>
                </li>
                <li onClick={toggleAddProduct} className="Navbar__item">
                    <Link className="Navbar__link">
                        <i className="fas fa-cart-plus"></i>Add Product
                    </Link>
                </li>
                <li onClick={toggleAddCategory} className="Navbar__item">
                    <Link className="Navbar__link" >
                        <i className="fas fa-plus"></i>Add Category
                    </Link>
                </li>
                <li className="Navbar__item">
                    <Link className="Navbar__link" onClick={logout}>
                        <i className="fas fa-sign-out-alt"></i>Sign Out
                    </Link>
                </li>
            </ul>
            <AddProduct show={addProductShowing} onHide={toggleAddProduct} />
            <AddCategory show={addCategoryShowing} onHide={toggleAddCategory} />
        </nav>
    );
}

export default Navbar;
