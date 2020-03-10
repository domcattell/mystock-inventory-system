import React, {useContext, useEffect} from 'react';

import { ProductsContext} from '../contexts/products.context'
import { CategoryContext } from '../contexts/category.context';

import useToggle from '../hooks/useToggle';

import ToastMessage from '../components/layout/ToastMessage';
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import ProductDetails from '../components/content/ProductDetails';
import Toolbar from '../components/tools/Toolbar';
import EditProductForm from '../components/forms/EditProductForm';

const Product = (props) => {

    const {product, isFetching, productsMsg, clearProductMessages, deleteProduct, getProduct, loadingProducts} = useContext(ProductsContext)
    const { getCategories, loadingCategories} = useContext(CategoryContext);
    const {product_name} = product
    const [toast, setToast] = useToggle(false);

    useEffect(() => {
        loadingProducts();
        getProduct(props.match.params.id);
        loadingCategories();
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
                <EditProductForm {...props} toast={toast} setToast={setToast}/>  
                {productsMsg ? <ToastMessage 
                    title="Update Status" 
                    message={productsMsg} 
                    showToast={toast}
                    toggleToast={setToast} 
                    clear={clearProductMessages}
                /> : null}
        </PageContainer>
    );
}

export default Product;
