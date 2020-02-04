import React, {useEffect, useContext} from 'react';
import { ProductsContext} from '../contexts/products.context'
import EditProduct from '../components/EditProduct'


const Product = (props) => {
    const {products, getProduct, deleteProduct} = useContext(ProductsContext)
    
    useEffect(() => {
        getProduct(props.match.params.id)
    },[getProduct])

    let product = products[0] || {}
    const {id, product_name, qty, category, SKU} = product

    const handleDelete = () => {
        deleteProduct(props.match.params.id)
        props.history.push("/")
    }

    return (
        <div>
            <h1>{id}</h1>
            <h2>{product_name}</h2>
            <h2>{qty}</h2>
            <h2>{category}</h2>
            <h2>{SKU}</h2>
            <button onClick={handleDelete}>Delete</button>
            <EditProduct {...products} {...props}/>
        </div>
    );
}

export default Product;
