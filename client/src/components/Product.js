import React from 'react';
import '../styles/Product.scss'

const Product = (props) => {
    return (
        <div className="productRoot">
            {props.name}
           
        </div>
    );
}

export default Product;
