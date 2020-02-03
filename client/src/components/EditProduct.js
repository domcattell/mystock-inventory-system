import React, {useContext} from 'react';
import useMultipleInputs from '../hooks/useMultipleInputs'
import { ProductsContext } from '../contexts/products.context';


const EditProduct = (props) => {
    const [product, handleChange, reset] = useMultipleInputs()
    const { editProduct } = useContext(ProductsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(product, props.match.params.id)
        reset();
    }

    return (
        <div>
            <h1>edit product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="sku" onChange={handleChange} value={product.sku} placeholder="SKU"/>
                <input type="text" name="name" onChange={handleChange} value={product.name} placeholder="Name"/>
                <input type="text" name="qty" onChange={handleChange} value={product.qty} placeholder="QTY"/>
                <input type="text" name="category" onChange={handleChange} value={product.category} placeholder="Category"/>
                <button>Update</button>
            </form>
        </div>
    );
}

export default EditProduct;
