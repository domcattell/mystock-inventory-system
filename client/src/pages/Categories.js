import React, {useContext} from 'react';

import { CategoryContext } from '../contexts/category.context';

import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import AllCategories from '../components/content/AllCategories';
import Toolbar from '../components/tools/Toolbar'


const Categories = () => {
    const { categories } = useContext(CategoryContext);

    return (
        <PageContainer>
            <PageHeader title="Categories" />
            <PageContent>
                <Toolbar
                    search={true}
                    searchList={categories}
                    itemLink={`/categories/`}
                    placeholderText="Search Categories..."
                    itemProperty={`category`}
                />
                
                <AllCategories />
            </PageContent>
        </PageContainer>
    );
}

export default Categories;
