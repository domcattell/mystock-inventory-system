import React, {useContext, useEffect} from 'react';
import useMultipleInputs from '../hooks/useMultipleInputs'
import { ProductsContext } from '../contexts/products.context';


const EditProduct = (props) => {
    // let item = props[0] || {}
    // let {id} = item

    const [newProductValue, handleChange, reset] = useMultipleInputs()
    const { editProduct } = useContext(ProductsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(newProductValue, props.match.params.id)
        reset();
    }
    
    return (
        <div>
            <h1>edit product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="sku" onChange={handleChange} value={newProductValue.sku} placeholder={"SKU"}/>
                <input type="text" name="name" onChange={handleChange} value={newProductValue.name} placeholder="Name"/>
                <input type="text" name="qty" onChange={handleChange} value={newProductValue.qty} placeholder="QTY"/>
                <input type="text" name="category" onChange={handleChange} value={newProductValue.category} placeholder="Category"/>
                <button>Update</button>
            </form>
        </div>
    );
}

export default EditProduct;
