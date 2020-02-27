import React,{ useContext } from 'react';
import ReactLoading from 'react-loading';

import { ProductsContext} from '../contexts/products.context'

import useMultipleInputs from '../hooks/useMultipleInputs';
import useToggle from '../hooks/useToggle';

import '../styles/EditForm.scss'

const EditForm = (props) => {
    const {product, editProduct, isFetching} = useContext(ProductsContext);
    const {product_name, qty, category, SKU, price, created_at} = product
    const [updateProduct, handleChange, reset, edit] = useMultipleInputs(product);
    const [enableForm, toggleForm] = useToggle(true);

    const enableEdit = () => {
        edit();
        toggleForm();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(updateProduct, props.match.params.id);
    }

    return (
        <div className={`EditFormRoot ${isFetching && "loading"}`}>
            {isFetching ? <ReactLoading type="spin" color="black" height="20%" width="20%" /> :
            <div>
                <h5>Update Product</h5>
                <div onClick={enableEdit} className="ProductPageFormLock"> 
                    {enableForm ? <i class="fas fa-lock-open"></i> : <i class="fas fa-lock"></i>}
                </div>
                <form onSubmit={handleSubmit}>

                    <div className="FormInput">
                        <label for="sku">SKU</label>
                        <input type="text" name="sku" onChange={handleChange} value={updateProduct.sku} disabled={enableForm} placeholder={SKU} required/>
                    </div>

                    <div className="FormInput">
                        <label for="name">Name</label>
                        <input type="text" name="name" onChange={handleChange} value={updateProduct.name} disabled={enableForm} placeholder={product_name} required/>
                    </div>
                        
                    <div className="FormInput">
                        <label for="category">Category</label>
                        <input type="text" name="category" onChange={handleChange} value={updateProduct.category} disabled={enableForm} placeholder={category} required/>
                    </div>

                    <div className="FormInput">
                        <label for="price">Price</label>
                        <input type="number" name="price" onChange={handleChange} value={updateProduct.price} disabled={enableForm} placeholder={price} required/>
                    </div>

                    <div className="FormInput">
                        <label for="qty">Quantity</label>
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
