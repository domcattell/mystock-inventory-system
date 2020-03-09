import React, {memo} from 'react';

import AllProducts from '../components/content/AllProducts'
import Toolbar from '../components/tools/Toolbar'
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';

const Products = () => {
    return (
        <PageContainer>
            <PageHeader title="Products" />
            <PageContent>
            <Toolbar sort={true}/>
            <AllProducts />
            </PageContent>
        </PageContainer>
    );
}

export default memo(Products);
