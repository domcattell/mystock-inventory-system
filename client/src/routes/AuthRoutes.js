import React, { useContext, useEffect } from 'react';
import { Route, Router, Switch, Redirect, withRouter } from 'react-router-dom';

import { ProductsProvider, ProductsContext } from '../contexts/products.context'
import { CategoryProvider } from '../contexts/category.context'
import { AuthContext } from '../contexts/auth.context'
import authToken from '../helpers/authToken'

import AddProduct from '../components/AddProduct'
import Product from '../pages/Product'
import Products from '../pages/Products'
import Dashboard from '../pages/Dashboard'

import Menubar from '../components/Menubar'

const AuthRoutes = (props) => {
    const { isAuthenticated } = useContext(AuthContext)
    const { getProducts } = useContext(ProductsContext)

    if (localStorage.token) {
        authToken(localStorage.token);
    }

    return (
        <div>
            
            
            {props.location.pathname !== "/login" && <Menubar />}
            {/* {!isAuthenticated && <Redirect to="/login" />} */}
            <Switch>
                <Route exact path="/dashboard" render={() => <Dashboard />} />
                <Route exact path="/products/all" render={() => <Products />} />
                <Route exact path="/products/:id" render={(routeProps) => <Product {...routeProps} />} />
            </Switch>
        </div>
    )
}

export default withRouter(AuthRoutes);


