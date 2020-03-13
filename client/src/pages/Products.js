import React from 'react';

import AllProducts from '../components/content/AllProducts'
import Toolbar from '../components/tools/Toolbar'
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';

const Products = () => {
    return (
        <PageContainer>
            <PageHeader title="Products" />
            <AllProducts />
        </PageContainer>
    );
}

export default Products;
