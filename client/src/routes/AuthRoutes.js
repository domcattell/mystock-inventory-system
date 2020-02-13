import React, {useContext, useEffect} from 'react';
import { Route, Router, Switch, Redirect, withRouter } from 'react-router-dom';

import {ProductsProvider} from '../contexts/products.context'
import {AuthContext} from '../contexts/auth.context'
import authToken from '../helpers/authToken'

import AddProduct from '../components/AddProduct'
import Product from '../pages/Product'
import Products from '../pages/Products'

import Menubar from '../components/Menubar'

const AuthRoutes = (props) => {
    const {isAuthenticated, loadUser} = useContext(AuthContext)

    // useEffect(() => {
    //     loadUser();
    // },[])

    // console.log(isAuthenticated);

    if(localStorage.token) {
        authToken(localStorage.token);
    }

    return (
        <div>
            {!isAuthenticated && <Redirect to="/login" />}
            <ProductsProvider>
                <Switch>
                    <Route exact path="/products/all"  render={() => <Products />}/>
                    <Route exact path="/products/add" render={() => <AddProduct />} />
                    <Route exact path="/products/:id" render={(routeProps) => <Product {...routeProps}/>} />
                </Switch>
            </ProductsProvider>
        </div>
    )   
}

export default withRouter(AuthRoutes);


