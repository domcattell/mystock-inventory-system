import React, {useContext, useEffect, memo} from 'react';
import '../styles/Dashboard.scss';

import PageHeader from '../components/PageHeader'
import PageContainer from '../components/PageContainer'
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
            <div className="dashboardContent">
                <div className="dashboardWidgetsContainer">
                    <Widget title="Total Products" content={products.length}/>
                    <Widget title="Total Categories" content={categories.length} />
                    <Widget title="total qty" content={qtyAmount}/>
                    <div className="dashboardStats">

                    </div>
                </div>
            </div>
        </PageContainer> 
    );
}

export default memo(Dashboard);
