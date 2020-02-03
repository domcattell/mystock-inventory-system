import React, {useContext, useEffect} from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import AddProduct from '../pages/AddProduct'
import IndexPage from '../pages/IndexPage'
import Product from '../pages/Product'
import { ProductsContext} from '../contexts/products.context'

const Routes = (props) => {

    return (
        <Switch>
            <Route exact path="/products/add" render={() => <AddProduct />} />
            <Route exact path="/products/:id" render={(routeProps) => <Product {...routeProps}/>} />
            <Route exact path="/" render={() => <IndexPage />} />
            <Redirect to="/" />
      </Switch>
    );
}

export default Routes;
