import React, { useContext, useEffect } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import { ProductsProvider, ProductsContext } from './contexts/products.context'
import Routes from './routes/Routes'
import { AuthProvider, AuthContext } from './contexts/auth.context'



const App = () => {
  return (
    <div className="App">
      <Link to="/products/add"><a>Add product</a></Link>
      <Link to="/products/all"><a>All</a></Link>
      
      <AuthProvider>
        <ProductsProvider>
            <Routes />
          </ProductsProvider>
      </AuthProvider>
     
    </div>
  );
}

export default App;
