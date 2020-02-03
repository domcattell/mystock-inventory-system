import React from 'react';
import { ProductsProvider } from '../contexts/products.context'
import Products from '../components/Products'

const IndexPage = () => {
    return (
        <div>
            <ProductsProvider>
                <Products />
            </ProductsProvider>
        </div>
    );
}

export default IndexPage;
