import React, {useContext} from 'react';
import ReactLoading from 'react-loading'

import { ProductsContext } from '../contexts/products.context'

import '../styles/ProductDetails.scss'

const ProductPageDetails = () => {
    const {product, isFetching} = useContext(ProductsContext);
    const {product_name, qty, category, SKU, price, created_at} = product;

    return (
        <div className={`ProductDetailsRoot ${isFetching && "loading"}`}>
            {isFetching ? <ReactLoading type="bars" color="gray"/> :
                <div className="ProductDetails">
                    <h5 className="ProductDetailsHeader">Product Details</h5>
                    <ul>
                        <li className="ProductDetailsItem">
                            <span className="ProductDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Product Name</span>
                            <span className="ProductDetailsContent">{product_name}</span>
                        </li>

                        <li className="ProductDetailsItem">
                            <span className="ProductDetailsTitle"><i className="fas fa-chevron-circle-right"></i>SKU</span>
                            <span className="ProductDetailsContent">{SKU}</span>
                        </li>

                        <li className="ProductDetailsItem">
                            <span className="ProductDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Category</span>
                            <span className="ProductDetailsContent">{category}</span>
                        </li>

                        <li className="ProductDetailsItem">
                            <span className="ProductDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Price</span>
                            <span className="ProductDetailsContent">£{price}</span>
                        </li>

                        <li className="ProductDetailsItem">
                            <span className="ProductDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Quantity</span>
                            <span className="ProductDetailsContent">{qty}</span>
                        </li>

                        <li className="ProductDetailsItem">
                            <span className="ProductDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Created</span>
                            <span className="ProductDetailsContent">{created_at}</span>
                        </li>
                    </ul>

                </div>
            }
        </div> 
    );
};

export default ProductPageDetails;