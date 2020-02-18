import React, {useEffect, useContext} from 'react';
import { ProductsContext} from '../contexts/products.context'
import EditProduct from '../components/EditProduct'


const Product = (props) => {
    const {products, deleteProduct, getProduct, itemsReset, isFetching} = useContext(ProductsContext)
    useEffect(() => {
        getProduct(props.match.params.id)
        // return () => {
        //     itemsReset()
        // }
    },[])


    console.log(isFetching)
    // let product = products[0] || {}
    // const {id, product_name, qty, category, SKU} = product
    // console.log(product)

    const handleDelete = () => {
        deleteProduct(props.match.params.id)
        props.history.push("/")
    }
    console.log(products)
    const data = isFetching ? "Loading" : (
        <div>
            {products.map(p => (
                <div>
                    <h1>{p.id}</h1>
                    <h4>{p.product_name}</h4>
               </div>
            ))}
            <button onClick={handleDelete}>Delete</button>
            <EditProduct {...props}/>
        </div>
    )

    return (
        <div>
            
            {data}
        </div>
    );
}

export default Product;
