import React from 'react';

import '../styles/ProductForm.scss';

const ProductForm = () => {
    return (
        <div className={`EditFormRoot ${isFetching && "loading"}`}>
            {isFetching ? <ReactLoading type="bars" color="gray"/> :
            <div>
                <h5>Update Product</h5>
                <div onClick={enableEdit} className="ProductPageFormLock"> 
                    {enableForm ? <i className="fas fa-lock-open"></i> : <i class="fas fa-lock"></i>}
                </div>
                <form className="EditForm" onSubmit={handleSubmit}>
                    
                    <div className="EditFormText">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" onChange={handleChange} value={updateProduct.name} disabled={enableForm} placeholder={product_name} required/>
                    </div>
                        
                    <div className="EditFormText">
                        <label htmlFor="category">Category:</label>
                        <select name="category" disabled={enableForm} selected={category} onChange={handleChange} >
                            <option selected hidden>{category}</option>
                            {categories.map(c => (
                                <option key={c.category} value={c.category}>{c.category}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="EditFormNum">
                        <label htmlFor="price">Price:</label>
                        <input type="number" name="price" onChange={handleChange} value={updateProduct.price} disabled={enableForm} placeholder={price} required/>
                    </div>

                    <div className="EditFormNum">
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

export default ProductForm;
