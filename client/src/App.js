import React, { useContext, useEffect } from 'react';
import { AuthProvider } from './contexts/auth.context';
import { ProductsProvider } from './contexts/products.context';

import Routes from './routes/Routes';
import AuthRoutes from './routes/AuthRoutes';

import './reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
      <AuthRoutes />
    </AuthProvider>
  );
}

export default App;
