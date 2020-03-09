import React, { useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';

import {ProductsContext} from '../contexts/products.context';
import {CategoryContext} from '../contexts/category.context';

import useToggle from '../hooks/useToggle';

import ItemCard from '../components/tools/ItemCard';
import GridContainer from '../components/layout/GridContainer';
import PageContainer from '../components/layout/PageContainer';
import PageContent from '../components/layout/PageContent';
import PageHeader from '../components/layout/PageHeader';
import Toolbar from '../components/tools/Toolbar';
import ToastMessage from '../components/layout/ToastMessage';
import CategoryDetails from '../components/content/CategoryDetails';
import EditCategoryForm from '../components/forms/EditCategoryForm';

const Category = (props) => {
    const {products, getCategoryProducts, isFetching, loading} = useContext(ProductsContext);
    const {category, deleteCategory, getCategory, categoryMsg, clearCategoryMessages, categoriesLoading, fetchingCategories} = useContext(CategoryContext);
    const [toast, setToast] = useToggle(false);


    useEffect(() => {
        loading();
        categoriesLoading();
        getCategoryProducts(props.match.params.id);
        getCategory(props.match.params.id);
    },[])

    return (
        <PageContainer>
            <PageHeader title={fetchingCategories ? "Loading..." : category.category}/>

            <PageContent>
                <Toolbar 
                    sort={true} 
                    actions={true} 
                    id={props.match.params.id}
                    deleteFunction={deleteCategory}
                />
                <CategoryDetails/>
            </PageContent>

            <PageContent>
                <EditCategoryForm {...props} toast={toast} setToast={setToast}/>
            </PageContent>

            <PageContent>
                <GridContainer>
                {products.map(product => (
                    <Link to={`/products/${product.id}`}>
                        <ItemCard
                            key={product.id} 
                            name={product.product_name} 
                            itemOne="SKU"
                            itemTwo="QTY"
                            itemThree="Category"
                            itemOneContent={product.SKU}
                            itemTwoContent={product.qty}
                            itemThreeContent={product.category}
                            fetching={isFetching}
                            />
                        </Link>
                    ))}
                </GridContainer>
                {categoryMsg && <ToastMessage 
                    title="Update Status" 
                    message={categoryMsg} 
                    showToast={toast}
                    toggleToast={setToast}
                    clear={clearCategoryMessages}
                />}
            </PageContent>
        </PageContainer>
    );
}

export default Category;
