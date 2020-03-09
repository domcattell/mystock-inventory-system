import React, { useContext } from 'react';
import ReactLoading from 'react-loading';

import { CategoryContext } from '../../contexts/category.context';
import { ProductsContext } from '../../contexts/products.context';

import '../../styles/content/CategoryDetails.scss';

const CategoryDetails = (props) => {
    const { category, categoriesFetching } = useContext(CategoryContext);
    const { products } = useContext(ProductsContext);

    return (
        <div className={`CategoryDetails ${categoriesFetching && "CategoryDetails--loading"}`}>
            <h5 className="CategoryDetails__header">Category Details</h5>
            {categoriesFetching ? <ReactLoading type="bars" color="gray" /> :
            <div className="CategoryDetails__info-wrapper">
                <ul className="CategoryDetails__ul">
                    <li className="CategoryDetails__item">
                        <span className="CategoryDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>Category Name</span>
                        <span className="CategoryDetails__content">{category.category}</span>
                    </li>

                    <li className="CategoryDetails__item">
                        <span className="CategoryDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>Total amount of products currently in {category.category} </span>
                        <span className="CategoryDetails__content">{products.length}</span>
                    </li>

                    <li className="CategoryDetails__item">
                        <span className="CategoryDetails__sub-heading"><i className="fas fa-chevron-circle-right"></i>Category ID </span>
                        <span className="CategoryDetails__content">{category.id}</span>

                    </li>
                </ul>
            </div>
            }
        </div>
    );
}

export default CategoryDetails;