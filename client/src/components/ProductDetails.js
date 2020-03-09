import React, {useContext} from 'react';
import ReactLoading from 'react-loading';

import { ProductsContext } from '../contexts/products.context';

import '../styles/ProductDetails.scss';

const ProductPageDetails = () => {
    const {product, isFetching} = useContext(ProductsContext);
    const {product_name, qty, category, SKU, price, created_at} = product;

    return (
        <div className={`ProductDetails ${isFetching && "ProductDetails--loading"}`}>
            <h5 className="ProductDetails__header">Product Details</h5>
            {isFetching ? <ReactLoading type="bars" color="gray"/> :
            <ul>
                <li className="ProductDetails__item">
                    <span className="ProductDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>Product Name</span>
                    <span className="ProductDetails__content">{product_name}</span>
                </li>

                <li className="ProductDetails__item">
                    <span className="ProductDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>SKU</span>
                    <span className="ProductDetails__content">{SKU}</span>
                </li>

                <li className="ProductDetails__item">
                    <span className="ProductDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>Category</span>
                    <span className="ProductDetails__content">{category}</span>
                </li>

                <li className="ProductDetails__item">
                    <span className="ProductDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>Price</span>
                    <span className="ProductDetails__content">£{price}</span>
                </li>

                <li className="ProductDetails__item">
                    <span className="ProductDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>Quantity</span>
                    <span className="ProductDetails__content">{qty}</span>
                </li>

                <li className="ProductDetails__item">
                    <span className="ProductDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Created</span>
                    <span className="ProductDetails__content">{created_at}</span>
                </li>
            </ul>
            }
        </div> 
    );
};

export default ProductPageDetails;