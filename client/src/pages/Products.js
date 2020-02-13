import React, { useContext, useEffect, memo, useState } from 'react';
import { ProductsContext, ProductsProvider } from '../contexts/products.context';
import { AuthContext } from '../contexts/auth.context';
import { Link } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import '../styles/Products.scss'
import Product from '../components/Product'

const Products = (props) => {

    let { getProducts, products, addProduct, loading, isFetching } = useContext(ProductsContext)
    const {serverRes, loadUser, currentUser} = useContext(AuthContext)
   
    useEffect(() => {
        loadUser();
        loading();
        getProducts();
    },[])

    return (
        <div className="productsRoot">
            {isFetching ? "Loading" : "Loaded"}
            <div className="products">
                <div className="product">
                    {products.map(product => (
                        <Product key={Product.id} name={product.product_name} sku={product.sku} qty={product.qty}/>
                    ))}
                </div>
            </div>
            <AddProduct />
        </div>
    );
}

export default memo(Products);
