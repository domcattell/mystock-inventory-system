import React, { useContext, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { ProductsContext, ProductsActionsContext } from '../../contexts/products.context';

import '../../styles/content/ProductDetails.scss';

const ProductPageDetails = (props) => {
    const { product, fetchingProducts } = useContext(ProductsContext);
    const { loadingProducts, getProduct } = useContext(ProductsActionsContext);
    const { product_name, qty, category, SKU, price, created_at } = product;

    useEffect(() => {
        loadingProducts();
        getProduct(props.match.params.id);
    }, [props.match.params]);

    return (
        <div className={`ProductDetails ${fetchingProducts && "ProductDetails--loading"}`}>
            <h5 className="ProductDetails__header">Product Details</h5>
            {fetchingProducts ? <ReactLoading type="bars" color="gray" /> :
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
}

export default ProductPageDetails;