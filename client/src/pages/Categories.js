import React from 'react';

import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import GridContainer from '../components/layout/GridContainer';
import AllCategories from '../components/content/AllCategories';


const Categories = () => {
    return (
            <PageContainer>
            <PageHeader title="Categories" />
            <PageContent>
                <AllCategories />
            </PageContent>
        </PageContainer>
    );
}

export default Categories;
