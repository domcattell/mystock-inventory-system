import React, {useContext, useEffect, memo} from 'react';
import '../styles/Dashboard.scss';

import PageHeader from '../components/PageHeader'
import PageContainer from '../components/PageContainer'
import Widget from '../components/Widget'

import { ProductsContext } from '../contexts/products.context';

const Dashboard = (props) => {

    const { products, getProducts } = useContext(ProductsContext)

    useEffect(() => {
        getProducts();
    },[])

    console.log(products.length)

    return (
        <PageContainer> 
            <PageHeader title="Dashboard" />
            <div className="dashboardContent">
                <div className="dashboardWidgetsContainer">
                    <Widget title="Total Products" content={products.length}/>
                    <Widget title="Total Categories" />
                    <Widget title="QTY In Hand" />
                    <div className="dashboardStats">

                    </div>
                </div>
            </div>
        </PageContainer> 
    );
}

export default memo(Dashboard);
