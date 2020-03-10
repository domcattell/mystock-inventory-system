import React from 'react';
import { AuthProvider } from './contexts/auth.context';
import { ProductsProvider } from './contexts/products.context';
import {CategoryProvider} from './contexts/category.context'

import Routes from './routes/Routes';

import './reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
          <ProductsProvider>
            <CategoryProvider>
              <Routes />
            </CategoryProvider>
          </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
