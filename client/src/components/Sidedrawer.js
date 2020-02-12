import React from 'react';

const Sidedrawer = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link><a>Dashboard</a></Link>
                </li>
                <li>
                    <Link><a>Products</a></Link>
                </li>
                <li>
                    <Link><a>Categories</a></Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidedrawer;
