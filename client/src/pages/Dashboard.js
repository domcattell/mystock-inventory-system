import React, {useContext, useEffect, memo} from 'react';

import PageHeader from '../components/layout/PageHeader'
import PageContainer from '../components/layout/PageContainer'
import PageContent from '../components/layout/PageContent'
import GridContainer from '../components/layout/GridContainer';
import Widget from '../components/Widget'

import { ProductsContext } from '../contexts/products.context';
import { CategoryContext } from '../contexts/category.context';

const Dashboard = () => {
    const { products, getProducts, qtyAmount} = useContext(ProductsContext)
    const { categories, getCategories } = useContext(CategoryContext)

    useEffect(() => {
        getProducts();
        getCategories();
    },[])

    return (
        <PageContainer> 
            <PageHeader title="Dashboard" />
                <PageContent>
                    <GridContainer>
                        <Widget title="Total Products" content={products.length}/>
                        <Widget title="Total Categories" content={categories.length} />
                        <Widget title="total qty" content={qtyAmount}/>
                    </GridContainer>
                </PageContent>
        </PageContainer> 
    );
}

export default memo(Dashboard);
