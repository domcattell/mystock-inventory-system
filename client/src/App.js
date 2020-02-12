import React, { useContext, useEffect } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import { ProductsProvider, ProductsContext } from './contexts/products.context'
import Routes from './routes/Routes'
import AuthRoutes from './routes/AuthRoutes'
import { AuthProvider, AuthContext } from './contexts/auth.context'
import './reset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from './components/Menubar'

const App = () => {
  return (
      <AuthProvider>
        <Routes/>
        <ProductsProvider>
          <Menubar />
          <AuthRoutes />
        </ProductsProvider>
      </AuthProvider>
  );
}

export default App;
