import React, { useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';

import {ProductsContext} from '../contexts/products.context';
import {CategoryContext} from '../contexts/category.context';

import CardLink from '../components/CardLink';
import GridContainer from '../components/layout/GridContainer';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import PageHeader from '../components/layout/PageHeader'

const Category = (props) => {
    const {products, getCategoryProducts, isFetching, loading} = useContext(ProductsContext);

    useEffect(() => {
        loading();
        getCategoryProducts(props.match.params.id);
    },[])

    console.log(products)

    return (
        <PageContainer>
            <PageHeader title="Products in Category" />
            <PageContent>
                <GridContainer>
                {products.map(product => (
                    <Link to={`/products/${product.id}`}>
                        <CardLink 
                            key={product.id} 
                            name={product.product_name} 
                            itemOne="SKU"
                            itemTwo="QTY"
                            itemThree="Category"
                            itemOneContent={product.SKU}
                            itemTwoContent={product.qty}
                            itemThreeContent={product.category}
                            fetching={isFetching}
                            />
                        </Link>
                    ))}
                </GridContainer>
            </PageContent>
        </PageContainer>
    );
}

export default Category;
