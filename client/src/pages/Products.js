import React, { useContext, useEffect, memo, useState } from 'react';
import { ProductsContext, ProductsProvider } from '../contexts/products.context';
import { AuthContext } from '../contexts/auth.context';
import { Route, NavLink, Switch, Link } from 'react-router-dom'
import AddProduct from './AddProduct'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'
import Nav from '../components/Nav'
import '../styles/Products.scss'

const Products = (props) => {

    let { getProducts, products, addProduct } = useContext(ProductsContext)
    const {serverRes, loadUser, currentUser} = useContext(AuthContext)
   
    useEffect(() => {
        loadUser();
        getProducts();
    },[])

    
    const [toggle, setToggle] = useState()

    const navToggle = () => {
        setToggle(!toggle)
    }

    console.log(currentUser)
    return (
        <div className="productsRoot">
            <div className="products">
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
      
        </div>
    );
}


export default memo(Products);
