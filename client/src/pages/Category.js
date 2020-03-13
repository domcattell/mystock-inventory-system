import React, { useContext, useEffect } from 'react';

import { CategoryContext, CategoryActionsContext } from '../contexts/category.context';

import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import PageHeader from '../components/layout/PageHeader';
import Toolbar from '../components/tools/Toolbar';
import CategoryDetails from '../components/content/CategoryDetails';
import EditCategoryForm from '../components/forms/EditCategoryForm';
import CategoryProducts from '../components/content/CategoryProducts';

const Category = (props) => {
    const { category, fetchingCategories } = useContext(CategoryContext);
    const { deleteCategory, clearCategoryMessages } = useContext(CategoryActionsContext);

    useEffect(() => {
        return () => {
            clearCategoryMessages();
        }
    }, [])

    return (
        <PageContainer>
            <PageHeader title={fetchingCategories ? "Loading..." : category.category} />
            <PageContent>
                <Toolbar
                    sort={true}
                    actions={true}
                    id={props.match.params.id}
                    deleteFunction={deleteCategory}
                />
                <CategoryDetails {...props} />
            </PageContent>
            <PageContent>
                <EditCategoryForm {...props} />
            </PageContent>
            <PageContent>
                <CategoryProducts {...props} />
            </PageContent>
        </PageContainer>
    );
}

export default Category;
