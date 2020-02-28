import React, { useContext } from 'react';
import ReactLoading from 'react-loading'

import { ProductsContext } from '../contexts/products.context'

import '../styles/ProductCard.scss'

const Product = (props) => {

    const { isFetching } = useContext(ProductsContext);
    const { qty, sku, name, category } = props;

    return (
        <div className={`productRoot ${isFetching && "loading"}`}>
            {isFetching ? <ReactLoading type="spin" color="white" /> :
            <div>
                <div className="productName">
                    <i className="fas fa-tshirt"></i>
                    <h4>{name}</h4>
                </div>
                <div className="productDetails">
                    <h5>Quantity: {qty}</h5>
                    <h5>SKU: {sku}</h5>
                    <h5>Category: {category}</h5>
                </div>
            </div>
            }       
        </div>
    );
}

export default Product;

