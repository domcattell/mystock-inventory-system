import React, {useEffect, useContext, useState} from 'react';
import { ProductsContext} from '../contexts/products.context'

import {Spinner} from 'react-bootstrap';

import DeleteProduct from '../components/modals/DeleteProduct'
import PageHeader from '../components/layout/PageHeader'
import PageContainer from '../components/layout/PageContainer'
import PageContent from '../components/layout/PageContent'
import Widget from '../components/Widget'

import useMultipleInputs from '../hooks/useMultipleInputs';
import useToggle from '../hooks/useToggle';

import '../styles/ProductPage.scss'

const Product = (props) => {

    const {product, loading, editProduct, getProduct, isFetching} = useContext(ProductsContext)
    const {product_name, qty, category, SKU, price, created_at} = product
    const [updateProduct, handleChange, reset, edit] = useMultipleInputs(product)
    const [formDisable, setFormDisable] = useState(true)
    const [deleteModal, toggleDeleteModal] = useToggle(false);

    useEffect(() => {
        loading();
        getProduct(props.match.params.id)
        console.log("sdffffffff")
    },[])

    const enableEdit = () => {
        edit();
        setFormDisable(!formDisable)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(updateProduct, props.match.params.id)
    }

    return ( 
        <PageContainer>
            <PageHeader title={isFetching ? "Loading..." : product_name} />
                <PageContent>
                    <div className="ProductPageWrapper">
                        <div className="ProductPageDetails">
                            {isFetching ? (
                                <Spinner  animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            ) : (
                                 <ul className="ProductPageDetailsList">
                                 <li><p className="ProductPageStat">SKU</p> <span className="ProductDetail">{SKU}</span></li>
                                 <li><p  className="ProductPageStat">Product Name</p> <span className="ProductDetail">{product_name}</span></li>
                                 <li><p  className="ProductPageStat">Category</p> <span className="ProductDetail">{category}</span></li>
                                 <li><p  className="ProductPageStat">Price</p> <span className="ProductDetail">£{price}</span></li>
                                 <li><p  className="ProductPageStat">Quantity</p> <span className="ProductDetail">{qty}</span></li>
                                 <li><p  className="ProductPageStat">Created</p> <span className="ProductDetail">25/02/2020</span></li>
                                 <button className="ProductPageDeleteBtn" onClick={toggleDeleteModal}>Delete</button>
                             </ul>
                            )}
                        </div>
                        {isFetching ? (
                                <Spinner  animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            ) : (
                        <div className="ProductPageForm">
                            <h5>Update Product</h5>
                            <div onClick={enableEdit} className="ProductPageFormLock"> 
                                {formDisable ? <i class="fas fa-lock-open"></i> : <i class="fas fa-lock"></i>}
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="FormInput">
                                    <label for="sku">SKU</label>
                                    <input type="text" name="sku" onChange={handleChange} value={updateProduct.sku} disabled={formDisable} placeholder={SKU} required/>
                                </div>

                                <div className="FormInput">
                                    <label for="name">Name</label>
                                    <input type="text" name="name" onChange={handleChange} value={updateProduct.name} disabled={formDisable} placeholder={product_name} required/>
                                </div>
                                 
                                <div className="FormInput">
                                    <label for="category">Category</label>
                                    <input type="text" name="category" onChange={handleChange} value={updateProduct.category} disabled={formDisable} placeholder={category} required/>
                                </div>

                                <div className="FormInput">
                                    <label for="price">Price</label>
                                    <input type="number" name="price" onChange={handleChange} value={updateProduct.price} disabled={formDisable} placeholder={price} required/>
                                </div>

                                <div className="FormInput">
                                    <label for="qty">Quantity</label>
                                    <input type="number" name="qty" onChange={handleChange} value={updateProduct.qty} disabled={formDisable} placeholder={qty} required/>
                                </div>
                            
                                <button name="submit" type="submit" disabled={formDisable}>Save</button>
                            </form>
                        </div>)}
                    </div>
                    <div className="ProductPageNotes">
                        
                    </div>
                </PageContent>
                <DeleteProduct show={deleteModal} onHide={toggleDeleteModal} productName={product_name} id={props.match.params.id} {...props}/>
        </PageContainer>
    );
}

export default Product;
