import React, { useContext, useEffect, useState } from 'react';

import PageHeader from '../components/layout/PageHeader'
import PageContainer from '../components/layout/PageContainer'
import PageContent from '../components/layout/PageContent'
import GridContainer from '../components/layout/GridContainer';
import Widget from '../components/tools/Widget'

import { ProductsContext, ProductsActionsContext } from '../contexts/products.context';
import { CategoryContext, CategoryActionsContext } from '../contexts/category.context';

const Dashboard = () => {
    const { products, qtyAmount } = useContext(ProductsContext);
    const { getProducts } = useContext(ProductsActionsContext);
    const { categories } = useContext(CategoryContext);
    const { getCategories } = useContext(CategoryActionsContext);

    useEffect(() => {
        if(products.length === 0) {
            getProducts();
        }
        if(categories.length === 0) {
            getCategories()
        }
    }, [products, categories]);
    
    return (
        <PageContainer>
            <PageHeader title="Dashboard" />
            <PageContent>
                <GridContainer>
                    <Widget title="Total Products" content={products.length} />
                    <Widget title="Total Categories" content={categories.length} />
                    <Widget title="total qty" content={qtyAmount} />
                </GridContainer>
            </PageContent>
        </PageContainer>
    );
};

export default Dashboard;
