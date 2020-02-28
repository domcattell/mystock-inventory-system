import React,{ useContext, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { ProductsContext } from '../contexts/products.context';
import { CategoryContext } from '../contexts/category.context';

import useMultipleInputs from '../hooks/useMultipleInputs';
import useToggle from '../hooks/useToggle';

import '../styles/EditForm.scss';

const EditForm = (props) => {
    
    const {product, editProduct, isFetching} = useContext(ProductsContext);
    const {categories, getCategories} = useContext(CategoryContext);
    const {product_name, qty, category, SKU, price, created_at} = product
    const [updateProduct, handleChange, reset, edit] = useMultipleInputs(product);
    const [enableForm, toggleForm] = useToggle(true);

    useEffect(() => {
        getCategories();
    },[])

    const enableEdit = () => {
        edit();
        toggleForm();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(updateProduct, props.match.params.id);
        props.toast === false && props.setToast()
    }

    return (
        <div className={`EditFormRoot ${isFetching && "loading"}`}>
            {isFetching ? <ReactLoading type="bars" color="gray"/> :
            <div>
                <h5>Update Product</h5>
                <div onClick={enableEdit} className="ProductPageFormLock"> 
                    {enableForm ? <i className="fas fa-lock-open"></i> : <i class="fas fa-lock"></i>}
                </div>
                <form onSubmit={handleSubmit}>

                    <div className="FormInput">
                        <label htmlFor="sku">SKU:</label>
                        <input type="text" name="sku" onChange={handleChange} value={updateProduct.sku} disabled={enableForm} placeholder={SKU} required/>
                    </div>

                    <div className="FormInput">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" onChange={handleChange} value={updateProduct.name} disabled={enableForm} placeholder={product_name} required/>
                    </div>
                        
                    <div className="FormInput">
                        <label htmlFor="category">Category:</label>
                        <select name="category" disabled={enableForm} selected={category} onChange={handleChange} >
                            {/* <option selected hidden>{category}</option> */}
                            {categories.map(c => (
                                <option key={c.category} value={c.category}>{c.category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="FormInput">
                        <label htmlFor="price">Price:</label>
                        <input type="number" name="price" onChange={handleChange} value={updateProduct.price} disabled={enableForm} placeholder={price} required/>
                    </div>

                    <div className="FormInput">
                        <label htmlFor="qty">Quantity:</label>
                        <input type="number" name="qty" onChange={handleChange} value={updateProduct.qty} disabled={enableForm} placeholder={qty} required/>
                    </div>
                
                    <button name="submit" type="submit" disabled={enableForm}>Save Changes</button>
                </form>
            </div>
            }
        </div>
    );
}

export default EditForm;
