import React, {useEffect, useContext} from 'react';
import { ProductsContext} from '../contexts/products.context'

import EditProduct from '../components/EditProduct'
import PageHeader from '../components/layout/PageHeader'
import PageContainer from '../components/layout/PageContainer'
import PageContent from '../components/layout/PageContent'
import Widget from '../components/Widget'

import '../styles/ProductPage.scss'

const Product = (props) => {
    const {product, deleteProduct, getProduct, isFetching} = useContext(ProductsContext)

    useEffect(() => {
        getProduct(props.match.params.id)
    },[])

    const {id, product_name, qty, category, SKU} = product || {}

    const handleDelete = () => {
        deleteProduct(props.match.params.id)
        props.history.push("/")
    }

    console.log(product)

    return (
        <PageContainer>
            <PageHeader title={product_name} />
                <PageContent>
                    <div className="ProductWidgetContainer">
                        <Widget title="QTY" content={qty}/>
                        <Widget title="Category" content={category}/>
                        <Widget title="SKU" content={SKU}/>
                    </div>
                    <div>
                   
                    </div>
                </PageContent>
        </PageContainer>
    );
}

export default Product;
