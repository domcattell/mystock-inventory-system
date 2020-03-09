import React,{ useContext, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { ProductsContext } from '../contexts/products.context';
import { CategoryContext } from '../contexts/category.context';

import useInputState from '../hooks/useInputState';
import useToggle from '../hooks/useToggle';

import '../styles/EditForm.scss';

const EditForm = (props) => {
    
    const {product, editProduct, isFetching} = useContext(ProductsContext);
    const {categories} = useContext(CategoryContext);
    const {product_name, qty, category, price} = product;

    const [enableForm, toggleForm] = useToggle(true);

    let defaultInput = {
        name: product_name,
        price: price,
        qty: qty,
        category: category
    };
    
    const [updateProduct, handleChange, reset, currentProduct] = useInputState("");
    
    useEffect(() => {
        currentProduct(defaultInput);
    },[product]);

    const enableEdit = () => {
        toggleForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(updateProduct, props.match.params.id);
        props.toast === false && props.setToast()
    };

    return (
        <div className={`EditForm ${isFetching && "EditForm--loading"}`}>
            <h5 className="EditForm__header">Update Product</h5>
            {isFetching ? <ReactLoading type="bars" color="gray"/> :
            <>
                <div onClick={enableEdit} className="EditForm__padlock-icn"> 
                    {enableForm ? <i className="fas fa-lock-open"></i> : <i className="fas fa-lock"></i>}
                </div>
                <form className="EditForm__form" onSubmit={handleSubmit}>

                    <div className="EditForm__txt-input-wrapper">
                        <label className="EditForm__label" htmlFor="name">Name:</label>
                        <input className="EditForm__txt-input" type="text" name="name" onChange={handleChange} value={updateProduct.name || ""} disabled={enableForm} placeholder={product_name} required/>
                    </div>
                        
                    <div className="EditForm__txt-input-wrapper">
                        <label className="EditForm__label" htmlFor="category">Category:</label>
                        <select className="EditForm__txt-input" name="category" disabled={enableForm} value={updateProduct.category || ""} onChange={handleChange} >
                            {categories.map(c => (
                                <option key={c.category} value={c.category}>{c.category}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="EditForm__num-input-wrapper">
                        <label className="EditForm__label" htmlFor="price">Price:</label>
                        <input className="EditForm__num-input" type="number" name="price" onChange={handleChange} value={updateProduct.price || ""} disabled={enableForm} placeholder={price} required/>
                    </div>

                    <div className="EditForm__num-input-wrapper">
                        <label className="EditForm__label" htmlFor="qty">Quantity:</label>
                        <input className="EditForm__num-input" type="number" name="qty" onChange={handleChange} value={updateProduct.qty || ""} disabled={enableForm} placeholder={qty} required/>
                    </div>
                           
                    <button className="EditForm__submit-btn" name="submit" type="submit" disabled={enableForm}>Save Changes</button>
                </form>
            </>
            }
        </div>
    );
}

export default EditForm;
