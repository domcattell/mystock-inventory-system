import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import { ProductsContext } from '../../contexts/products.context';

import ItemCard from '../tools/ItemCard';
import GridContainer from '../layout/GridContainer';

const AllProducts = () => {
    const { getProducts, products, loading, isFetching } = useContext(ProductsContext)

    useEffect(() => {
        loading();
        getProducts();
    }, [])

    return (
        <GridContainer>
            {products.map(product => (
                <Link to={`/products/${product.id}`}>
                    <ItemCard
                        key={product.id} 
                        name={product.product_name} 
                        itemOne="SKU"
                        itemTwo="Quantity"
                        itemThree="Category"
                        itemOneContent={product.SKU}
                        itemTwoContent={product.qty}
                        itemThreeContent={product.category}
                        fetching={isFetching}
                    />
                </Link>
            ))}
        </GridContainer>
    );
}

export default AllProducts;