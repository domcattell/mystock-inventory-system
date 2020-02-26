import React,{useContext} from 'react';

import { ProductsContext } from '../contexts/products.context';

import '../styles/ProductsSortBy.scss';

const ProductsSortBy = () => {

    const {sortAZ, sortZA, sortProductsAZ } = useContext(ProductsContext)

    const sortBtn = () => {
        if (!sortProductsAZ) {
            return <i onClick={sortAZ} class="fas fa-sort-alpha-up"></i>
        } else {
            return <i onClick={sortZA} class="fas fa-sort-alpha-up-alt"></i>
        }
    }
    
    return (
        <div className="productControls">
            <p>Sort by:</p>
            {sortBtn()}
        </div>
    );
}

export default ProductsSortBy;
