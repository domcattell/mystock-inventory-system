import React, {useContext, useEffect} from 'react';
import ReactLoading from 'react-loading'

import { ProductsContext } from '../contexts/products.context'

import DeleteProduct from '../components/modals/DeleteProduct'

import useToggle from '../hooks/useToggle';

import '../styles/ProductDetails.scss'

const ProductPageDetails = (props) => {

    const {product, getProduct, isFetching, loading} = useContext(ProductsContext)
    const {product_name, qty, category, SKU, price, created_at} = product
    const [deleteModal, toggleDeleteModal] = useToggle(false);

    useEffect(() => {
        loading();
        getProduct(props.match.params.id)
    },[])

    return (
        <div className={`ProductDetailsRoot ${isFetching && "loading"}`}>
            {isFetching ? <ReactLoading type="spin" color="black" /> :
                 <ul className="ProductPageDetailsList">
                 <li><p className="ProductPageStat">SKU</p> <span className="ProductDetail">{SKU}</span></li>
                 <li><p  className="ProductPageStat">Product Name</p> <span className="ProductDetail">{product_name}</span></li>
                 <li><p  className="ProductPageStat">Category</p> <span className="ProductDetail">{category}</span></li>
                 <li><p  className="ProductPageStat">Price</p> <span className="ProductDetail">£{price}</span></li>
                 <li><p  className="ProductPageStat">Quantity</p> <span className="ProductDetail">{qty}</span></li>
                 <li><p  className="ProductPageStat">Created</p> <span className="ProductDetail">25/02/2020</span></li>
                 <button className="ProductPageDeleteBtn" onClick={toggleDeleteModal}>Delete</button>
                </ul>
            }
            <DeleteProduct show={deleteModal} onHide={toggleDeleteModal} productName={product_name} id={props.match.params.id} {...props}/>
        </div> 
    );
}

export default ProductPageDetails;
