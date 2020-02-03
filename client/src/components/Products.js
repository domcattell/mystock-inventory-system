import React, { useContext, useEffect } from 'react';
import { ProductsContext, ProductsProvider } from '../contexts/products.context';
import { Route, NavLink, Switch, Link } from 'react-router-dom'
import Product from '../pages/Product'

const Products = (props) => {

    const { getProducts, products } = useContext(ProductsContext)

    useEffect(() => {
        getProducts()
    },[getProducts])

    console.log(products)

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


        </div>
    );
}


export default Products;
