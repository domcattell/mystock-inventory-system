import React, { useContext, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import { ProductsContext, ProductsActionsContext } from '../../contexts/products.context';

import ItemCard from '../tools/ItemCard';
import GridContainer from '../layout/GridContainer';

const AllProducts = () => {
    const { products, fetchingProducts } = useContext(ProductsContext);
    const { getProducts, loadingProducts } = useContext(ProductsActionsContext);

    useEffect(() => {
        if (products.length === 0) {
            loadingProducts();
            getProducts();
        }
    }, [products]);

    return (
        <GridContainer>
            {products.map(product => (
                <Link key={product.id} to={`/products/${product.id}`}>
                    <ItemCard
                        key={product.id}
                        name={product.product_name}
                        itemOne="SKU"
                        itemTwo="Quantity"
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

export default memo(AllProducts);
