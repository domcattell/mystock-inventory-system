import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import ProductCard from '../components/ProductCard';

import { ProductsContext } from '../contexts/products.context';

import '../styles/ProductsGrid.scss'

const ProductsGrid = () => {
    const { getProducts, products, loading } = useContext(ProductsContext)

    useEffect(() => {
        loading();
        getProducts();
        console.log("yo")
    }, [])

    return (
        <div className="products">
            {products.map(product => (
                <Link className="productLink" to={`/products/${product.id}`}>
                    <ProductCard key={product.id} name={product.product_name} sku={product.SKU} qty={product.qty} category={product.category} />
                </Link>
            ))}
        </div>
    );
}

export default ProductsGrid;
