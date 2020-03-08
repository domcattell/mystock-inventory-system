import React, {useContext, useEffect} from 'react';

import { ProductsContext} from '../contexts/products.context'
import { CategoryContext } from '../contexts/category.context';

import useToggle from '../hooks/useToggle';

import ToastMessage from '../components/layout/ToastMessage';
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import ProductDetails from '../components/ProductDetails';
import Toolbar from '../components/Toolbar';
import EditForm from '../components/EditForm';

import '../styles/ProductPage.scss';

const Product = (props) => {

    const {product, isFetching, msg, clearMessages, deleteProduct, getProduct, loading} = useContext(ProductsContext)
    const { getCategories, categoriesLoading} = useContext(CategoryContext);
    const {product_name} = product
    const [toast, setToast] = useToggle(false);

    useEffect(() => {
        loading();
        getProduct(props.match.params.id);
        categoriesLoading();
        getCategories();
    },[])

    return ( 
        <PageContainer>
            <PageHeader title={isFetching ? "Loading..." : product_name} />
                <PageContent>
                    <Toolbar
                        actions={true}
                        id={props.match.params.id}
                        deleteFunction={deleteProduct}
                    />
                    <ProductDetails {...props}/>
                </PageContent>
                <EditForm {...props} toast={toast} setToast={setToast}/>  
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
