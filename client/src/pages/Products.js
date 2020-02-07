import React, { useContext, useEffect, memo } from 'react';
import { ProductsContext, ProductsProvider } from '../contexts/products.context';
import { AuthContext } from '../contexts/auth.context';
import { Route, NavLink, Switch, Link } from 'react-router-dom'
import AddProduct from './AddProduct'

const Products = (props) => {

    let { getProducts, products, addProduct } = useContext(ProductsContext)
    const {user} = useContext(AuthContext)
    console.log(`from products front end ${user}`)
    useEffect(() => {
        getProducts();
    },[])
    
    return (
        <div>
            {products.map(product => (
                <Link to={`/products/${product.id}`}>
                <div style={{margin: "40px"}}>
                    <h2>{product.product_name}</h2>
                    <li>{product.category}</li>
                    <li>SKU: {product.SKU}</li>
                    <li>QTY: {product.qty}</li>
                </div>
                </Link>
            ))}

            <AddProduct />
        </div>
    );
}


export default memo(Products);
