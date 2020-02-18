import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom'
import '../styles/Navbar.scss'
import {AuthContext} from '../contexts/auth.context'
import {ProductsContext} from '../contexts/products.context'
import useToggle from '../hooks/useToggle';
import AddProduct from '../components/AddProduct'

const Navbar = (props) => {
    const {logoutUser} = useContext(AuthContext)
    const [addProductShowing, toggleAddProduct] = useToggle(false);

    const logout = () => {
        logoutUser();
    }

    return (
        <nav className={props.visible ? "navbarRoot open" : "navbarRoot"}>
            <ul className="navbarUl">
                <li className="navbarItem">
                    <Link to="/dashboard" className="navbarLink">
                        <a><i class="fas fa-tachometer-alt">
                        </i>Dashboard</a>
                    </Link>
                </li >
                <li className="navbarItem">
                    <Link to="/products/all" className="navbarLink">
                        <a><i class="fas fa-th">
                        </i>Products</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink">
                        <a><i class="fas fa-box-open">
                        </i>Categories</a>
                    </Link>
                </li>
                <li onClick={toggleAddProduct} className="navbarItem">
                    <Link className="navbarLink">
                        <a><i class="fas fa-cart-plus">
                        </i>Add Product</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink">
                        <a><i class="fas fa-plus">
                        </i>Add Category</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link className="navbarLink" onClick={logout}>
                        <a><i class="fas fa-sign-out-alt">
                        </i>Sign Out</a>
                    </Link>
                </li>
            </ul>
            <AddProduct show={addProductShowing} onHide={toggleAddProduct}/>
        </nav>
    );
}

export default Navbar;
