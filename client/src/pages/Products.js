import React, {memo} from 'react';

import ProductsGrid from '../components/ProductsGrid'
import ProductsSortBy from '../components/ProductsSortBy'
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';

const Products = () => {
    return (
        <PageContainer>
            <PageHeader title="Products" />
            <ProductsSortBy />
            <PageContent>
            <ProductsGrid />
            </PageContent>
        </PageContainer>
    );
}

export default memo(Products);
