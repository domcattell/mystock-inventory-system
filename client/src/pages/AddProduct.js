import React, {useContext} from 'react';
import useMultipleInputs from '../hooks/useMultipleInputs'
import { ProductsContext } from '../contexts/products.context';
import Axios from 'axios';

const AddProduct = () => {
    const [product, handleChange, reset] = useMultipleInputs("")
    const { addProduct } = useContext(ProductsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product)
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="sku" onChange={handleChange} value={product.sku} placeholder="SKU"/>
                <input type="text" name="name" onChange={handleChange} value={product.name} placeholder="Name"/>
                <input type="text" name="qty" onChange={handleChange} value={product.qty} placeholder="QTY"/>
                <input type="text" name="category" onChange={handleChange} value={product.category} placeholder="Category"/>
                <button>Create</button>
            </form>
        </div>
    );
}

export default AddProduct;
