import React, { useContext, useEffect } from 'react';

import { ProductsContext, ProductsActionsContext } from '../contexts/products.context'

import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import ProductDetails from '../components/content/ProductDetails';
import Toolbar from '../components/tools/Toolbar';
import EditProductForm from '../components/forms/EditProductForm';

const Product = (props) => {
    const { product, fetchingProducts, productsMsg } = useContext(ProductsContext);
    const { deleteProduct, clearProductMessages } = useContext(ProductsActionsContext);
    const { product_name } = product;

    useEffect(() => {
        return () => {
            clearProductMessages();
        }
    },[])

    return (
        <PageContainer>
            {productsMsg ? <h4>{productsMsg.error}</h4> :
            <div>
            <PageHeader title={fetchingProducts ? "Loading..." : product_name} />
            <PageContent>
                <Toolbar
                    actions={true}
                    id={props.match.params.id}
                    deleteFunction={deleteProduct}
                />
                <ProductDetails {...props} />
            </PageContent> 
            <EditProductForm {...props} /> 
            </div>
            }
        </PageContainer>
    );
}

export default Product;
