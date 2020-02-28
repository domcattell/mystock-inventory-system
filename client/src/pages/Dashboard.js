import React, {useContext, useEffect, memo} from 'react';
import '../styles/Dashboard.scss';

import PageHeader from '../components/layout/PageHeader'
import PageContainer from '../components/layout/PageContainer'
import PageContent from '../components/layout/PageContent'
import Widget from '../components/Widget'

import { ProductsContext } from '../contexts/products.context';
import { CategoryContext } from '../contexts/category.context';

const Dashboard = (props) => {
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
                    <div className="dashboardContent">
                        <div className="dashboardWidgetsContainer">
                            <Widget title="Total Products" content={products.length}/>
                            <Widget title="Total Categories" content={categories.length} />
                            <Widget title="total qty" content={qtyAmount}/>
                        </div>
                    </div>
                </PageContent>
        </PageContainer> 
    );
}

export default memo(Dashboard);
