import React, { useContext, useEffect } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import IndexPage from './pages/IndexPage'
import { ProductsProvider, ProductsContext } from './contexts/products.context'
import Product from './pages/Product'
import Routes from './routes/Routes'


const App = () => {


  return (
    <div className="App">
      <Link to="/products/add"><a>Add product</a></Link>
      <ProductsProvider>
        <Routes />
      </ProductsProvider>
    </div>
  );
}

export default App;
