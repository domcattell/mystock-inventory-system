import React, { useContext } from 'react';

import { ProductsContext } from '../contexts/products.context';

import AllProducts from '../components/content/AllProducts'
import Toolbar from '../components/tools/Toolbar'
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';

const Products = () => {
    const { products } = useContext(ProductsContext);

    return (
        <PageContainer>
            <PageHeader title="Products" />
            <PageContent>
                <Toolbar
                    sort={true}
                    search={true}
                    searchList={products}
                    itemLink={`/products/`}
                    placeholderText="Search Products..."
                    itemProperty={`product_name`}

                />
                <AllProducts />
            </PageContent>
        </PageContainer>
    );
}

export default Products;
