import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import AddProduct from '../pages/AddProduct'
import Product from '../pages/Product'
import Products from '../pages/Products'
// import AddCategory from '../pages/AddCategory'
// import Categories from '../pages/Categories'
// import Category from '../pages/Category'


const AuthRoutes = () => {
    return (
        <Switch>
            <Route exact path="/products/all" render={() => <Products />} />
            <Route exact path="/products/add" render={() => <AddProduct />} />
            <Route exact path="/products/:id" render={(routeProps) => <Product {...routeProps}/>} />
            {/* <Route exact path="/products/categories/add" render={() => <AddCategory />} />
            <Route exact path="/products/categories/all" render={() => <Categories />} />
            <Route exact path="/products/categories/:id" render={(routeProps) => <Category {...routeProps} />} /> */}
        </Switch>
    );
}

export default AuthRoutes;


