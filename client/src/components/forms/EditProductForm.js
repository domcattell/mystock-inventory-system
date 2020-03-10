import React, { useContext, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { ProductsContext } from '../../contexts/products.context';
import { CategoryContext } from '../../contexts/category.context';

import useInputState from '../../hooks/useInputState';
import useToggle from '../../hooks/useToggle';

import ToastMessage from '../layout/ToastMessage';

import '../../styles/forms/EditForm.scss';

const EditProductForm = (props) => {

    const { product, editProduct, fetchingProducts, productsMsg, clearProductMessages} = useContext(ProductsContext);
    const {getCategories} = useContext(CategoryContext);
    const { categories } = useContext(CategoryContext);
    const { product_name, qty, category, price } = product;

    const [enableForm, toggleForm] = useToggle(true);
    const [toast, setToast] = useToggle(false);

    //needed for controlled inputs. if the values from the "product" global state
    //are used, then users could manually edit the id and date created 
    //from the dev tools and submit those changes.
    let defaultInput = {
        name: product_name,
        price: price,
        qty: qty,
        category: category
    };

    const [updateProduct, handleChange, reset, currentProduct] = useInputState("");

    useEffect(() => {
        getCategories();
        //fill in the controlled input with the current "product" from global state
        currentProduct(defaultInput);
    }, [product]);

    const enableEdit = () => {
        toggleForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(updateProduct, props.match.params.id);
        toast === false && setToast()
    };

    return (
        <div className={`EditProductForm ${fetchingProducts && "EditProductForm--loading"}`}>
            <h5 className="EditProductForm__header">Update Product</h5>
            {fetchingProducts ? <ReactLoading type="bars" color="gray" /> :
                <>
                    <div onClick={enableEdit} className="EditProductForm__padlock-icn">
                        {enableForm ? <i className="fas fa-lock-open"></i> : <i className="fas fa-lock"></i>}
                    </div>
                    <form className="EditProductForm__form" onSubmit={handleSubmit}>

                        <div className="EditProductForm__txt-input-wrapper">
                            <label className="EditProductForm__label" htmlFor="name">Name:</label>
                            <input className="EditProductForm__txt-input" type="text" name="name" onChange={handleChange} value={updateProduct.name || ""} disabled={enableForm} placeholder={product_name} required />
                        </div>

                        <div className="EditProductForm__txt-input-wrapper">
                            <label className="EditProductForm__label" htmlFor="category">Category:</label>
                            <select className="EditProductForm__txt-input" name="category" disabled={enableForm} value={updateProduct.category || ""} onChange={handleChange} >
                                {categories.map(c => (
                                    <option key={c.category} value={c.category}>{c.category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="EditProductForm__num-input-wrapper">
                            <label className="EditProductForm__label" htmlFor="price">Price:</label>
                            <input className="EditProductForm__num-input" type="number" name="price" onChange={handleChange} value={updateProduct.price || ""} disabled={enableForm} placeholder={price} required />
                        </div>

                        <div className="EditProductForm__num-input-wrapper">
                            <label className="EditProductForm__label" htmlFor="qty">Quantity:</label>
                            <input className="EditProductForm__num-input" type="number" name="qty" onChange={handleChange} value={updateProduct.qty || ""} disabled={enableForm} placeholder={qty} required />
                        </div>

                        <button className="EditProductForm__submit-btn" name="submit" type="submit" disabled={enableForm}>Save Changes</button>
                    </form>
                </>
            }
            {productsMsg ? <ToastMessage
                title="Update Status"
                message={productsMsg}
                showToast={toast}
                toggleToast={setToast}
                clear={clearProductMessages}
            /> : null}
        </div>
    );
}

export default EditProductForm;
