import React from 'react';
import '../styles/Product.scss'

const Product = (props) => {
    const {qty, sku, name, category} = props;

    return (
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
