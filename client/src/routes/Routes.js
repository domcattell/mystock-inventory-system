import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthContext, AuthActionsContext } from '../contexts/auth.context'

import authToken from '../helpers/authToken'
import PrivateRoute from '../helpers/PrivateRoute'

import Product from '../pages/Product'
import Products from '../pages/Products'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Categories from '../pages/Categories';
import Category from '../pages/Category';
import ErrorPage from '../components/layout/ErrorPage';

import Menubar from '../components/navbar/Menubar'

const Routes = () => {
    if (localStorage.token) {
        authToken(localStorage.token);
    };

    const { checkAuth } = useContext(AuthActionsContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        checkAuth();
        console.log("test")
    }, []);

    return (
        <>
            {token ? <Menubar /> : null}
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route exact path="/login" render={(routeProps) => <Login {...routeProps} />} />
                <Route exact path="/register" render={() => <Register />} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/categories/all" component={Categories} />
                <PrivateRoute exact path="/categories/:id" component={Category} />
                <PrivateRoute exact path="/products/all" component={Products} />
                <PrivateRoute exact path="/products/:id" component={Product} />
                <Route exact path='*' render={() => <ErrorPage />} />
            </Switch>
        </>
    );
}

export default Routes;