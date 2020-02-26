import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';

import { ProductsContext } from '../contexts/products.context'

import '../styles/Product.scss'

const Product = (props) => {

    const { isFetching } = useContext(ProductsContext);
    const { qty, sku, name, category } = props;

    return (
        isFetching

            ?

            <div className="productsLoading">
                <Spinner animation="border" role="status" variant="dark">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>

            :

            <div className="productRoot">
                <div className="productName">
                    <i class="fas fa-tshirt"></i>
                    <h4>{name}</h4>
                </div>
                <div className="productDetails">
                    <h5>Quantity: {qty}</h5>
                    <h5>SKU: {sku}</h5>
                    <h5>Category: {category}</h5>
                </div>
            </div>


    );
}

export default Product;
