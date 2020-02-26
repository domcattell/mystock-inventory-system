import React, { useContext, useEffect, memo, useState } from 'react';

import ProductsGrid from '../components/ProductsGrid'
import ProductsSortBy from '../components/ProductsSortBy'
import ProductCard from '../components/ProductCard'
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';

import '../styles/Products.scss'

const Products = (props) => {
    return (
        <PageContainer>
            <PageHeader title="Products" />
            <ProductsSortBy />
            <PageContent>
            <ProductsGrid />
            </PageContent>
        </PageContainer>
    );
}

export default memo(Products);
