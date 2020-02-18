import React, {useContext, useEffect} from 'react';
import { Route, Router, Switch, Redirect, withRouter } from 'react-router-dom';

import {ProductsProvider} from '../contexts/products.context'
import {CategoryProvider} from '../contexts/category.context'
import {AuthContext} from '../contexts/auth.context'
import authToken from '../helpers/authToken'

import AddProduct from '../components/AddProduct'
import Product from '../pages/Product'
import Products from '../pages/Products'
import Dashboard from '../pages/Dashboard'

import Menubar from '../components/Menubar'

const AuthRoutes = (props) => {
    const {isAuthenticated} = useContext(AuthContext)

    if(localStorage.token) {
        authToken(localStorage.token);
    }

    return (
        <div>
            <ProductsProvider>
                <CategoryProvider>
                    {props.location.pathname !== "/login" && "/register" && <Menubar />}
                    {!isAuthenticated && <Redirect to="/login" />}
                        <Switch>
                            <Route exact path="/dashboard"  render={() => <Dashboard />}/>
                            <Route exact path="/products/all"  render={() => <Products />}/>
                            <Route exact path="/products/:id" render={(routeProps) => <Product {...routeProps}/>} />
                        </Switch>
                </CategoryProvider>
            </ProductsProvider>
        </div>
    )   
}

export default withRouter(AuthRoutes);


