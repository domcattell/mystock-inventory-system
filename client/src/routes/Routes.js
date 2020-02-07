import React, {useContext, useEffect} from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import AddProduct from '../pages/AddProduct'
import Product from '../pages/Product'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Routes = (props) => {

    return (
        <Switch>
            <Route exact path ="/register" render={() => <Register />} />
            <Route exact path ="/login" render={(routeProps) => <Login {...routeProps} />} />
            <Route exact path="/products/add" render={() => <AddProduct />} />
            <Route exact path="/products/all" render={() => <Products />} />
            <Route exact path="/products/:id" render={(routeProps) => <Product {...routeProps}/>} />
            <Route exact path="/" render={() => <h1>Hello</h1>} />
            <Redirect to="/" />
      </Switch>
    );
}

export default Routes;
