import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Navbar.scss'

const Navbar = (props) => {

    return (
        <nav className={props.visible ? "navbarRoot open" : "navbarRoot"}>
            <ul className="navbarUl">
                <li className="navbarItem">
                    <Link>
                        <a><i class="fas fa-tachometer-alt">
                        </i>Dashboard</a>
                    </Link>
                </li >
                <li className="navbarItem">
                    <Link>
                        <a><i class="fas fa-box-open">
                        </i>Products</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link>
                        <a><i class="fas fa-list-alt">
                        </i>Categories</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link>
                        <a><i class="fas fa-list-alt">
                        </i>Add Product</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link>
                        <a><i class="fas fa-list-alt">
                        </i>Add Category</a>
                    </Link>
                </li>
                <li className="navbarItem">
                    <button><i class="fas fa-sign-out-alt">
                        </i>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
