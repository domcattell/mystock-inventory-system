import React, {useContext} from 'react';
import { ProductsContext} from '../contexts/products.context'

import ToastMessage from '../components/layout/ToastMessage';
import useToggle from '../hooks/useToggle';
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import ProductDetails from '../components/ProductDetails';
import EditForm from '../components/EditForm';
// import ProductsSortBy from '../components/ProductsSortBy';

import '../styles/ProductPage.scss';

const Product = (props) => {

    const {product, isFetching, msg, clearMessages} = useContext(ProductsContext)
    const {product_name} = product
    const [toast, setToast] = useToggle(false);

    return ( 
        <PageContainer>
            <PageHeader title={isFetching ? "Loading..." : product_name} />
                <PageContent className="ProductPageWrapper">
                    {/* <ProductsSortBy /> */}
                    <ProductDetails {...props}/>
                    <EditForm {...props} toast={toast} setToast={setToast}/>  
                </PageContent>
                {msg ? <ToastMessage 
                    title="Update Status" 
                    message={msg} 
                    showToast={toast}
                    toggleToast={setToast} 
                    clear={clearMessages}
                /> : null}
        </PageContainer>
    );
}

export default Product;
