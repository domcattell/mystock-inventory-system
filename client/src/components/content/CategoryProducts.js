import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {ProductsContext} from '../../contexts/products.context';

import ItemCard from '../tools/ItemCard';
import GridContainer from '../layout/GridContainer'

const CategoryProducts = (props) => {
    const {products, getCategoryProducts, fetchingProducts, loadingProducts} = useContext(ProductsContext);

    useEffect(() => {
        loadingProducts();
        getCategoryProducts(props.match.params.id)
    },[])

    return (
        <GridContainer>
        {products.map(product => (
            <Link to={`/products/${product.id}`}>
                <ItemCard
                    key={product.id} 
                    name={product.product_name} 
                    itemOne="SKU"
                    itemTwo="QTY"
                    itemThree="Category"
                    itemOneContent={product.SKU}
                    itemTwoContent={product.qty}
                    itemThreeContent={product.category}
                    fetching={fetchingProducts}
                    />
                </Link>
            ))}
        </GridContainer>
    );
}

export default CategoryProducts;
