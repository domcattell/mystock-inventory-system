import React, { useContext } from 'react';

import { ProductsContext } from '../contexts/products.context'

import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import ProductDetails from '../components/content/ProductDetails';
import Toolbar from '../components/tools/Toolbar';
import EditProductForm from '../components/forms/EditProductForm';

const Product = (props) => {
    const { product, isFetching, deleteProduct } = useContext(ProductsContext);
    const { product_name } = product;

    return (
        <PageContainer>
            <PageHeader title={isFetching ? "Loading..." : product_name} />
            <PageContent>
                <Toolbar
                    actions={true}
                    id={props.match.params.id}
                    deleteFunction={deleteProduct}
                />
                <ProductDetails {...props} />
            </PageContent>
            <EditProductForm {...props} />
        </PageContainer>
    );
}

export default Product;
