import React, {useContext} from 'react';
import { ProductsContext} from '../contexts/products.context'

import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import ProductDetails from '../components/ProductDetails';
import EditForm from '../components/EditForm';

import '../styles/ProductPage.scss';

const Product = (props) => {

    const {product, isFetching} = useContext(ProductsContext)
    const {product_name} = product

    return ( 
        <PageContainer>
            <PageHeader title={isFetching ? "Loading..." : product_name} />
                <PageContent className="ProductPageWrapper">
                    <ProductDetails {...props}/>
                    <EditForm {...props}/>   
                </PageContent>
        </PageContainer>
    );
}

export default Product;
