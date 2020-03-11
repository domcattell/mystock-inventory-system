import React from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from '../helpers/PrivateRoute';
import Menubar from '../components/navbar/Menubar';

import Product from '../pages/Product'
import Products from '../pages/Products'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Categories from '../pages/Categories';
import Category from '../pages/Category';

const AuthenticatedRoutes = () => {
    return (
        <div>
             <Menubar />
                
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/categories/all" component={Categories} />
                    <PrivateRoute exact path="/categories/:id" component={Category} />
                    <PrivateRoute exact path="/products/all" component={Products} />
                    <PrivateRoute exact path="/products/:id" component={Product} />
                    
               
        </div>
    );
}

export default AuthenticatedRoutes;
