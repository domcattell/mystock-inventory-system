import React, { useContext } from 'react';
import ReactLoading from 'react-loading';

import { CategoryContext } from '../contexts/category.context';
import { ProductsContext } from '../contexts/products.context';

import useInputState from '../hooks/useInputState';

import '../styles/CategoryDetails.scss';

const CategoryDetails = (props) => {
    const { category, editCategory, categoriesFetching } = useContext(CategoryContext);
    const { products } = useContext(ProductsContext);
    const [categoryName, handleChange] = useInputState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        editCategory(categoryName, props.match.params.id);
        props.toast == false && props.setToast();
    }

    return (
        <div className={`CategoryDetails ${categoriesFetching && "CategoryDetails--loading"}`}>
            <h5 className="CategoryDetails__header">Category Details</h5>
            {categoriesFetching ? <ReactLoading type="bars" color="gray" /> :
                <>
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
                    <div className="CategoryDetails__form-wrapper">
                        <form className="CategoryDetails__form" onSubmit={handleSubmit}>
                            <label className="CategoryDetails__form__label" htmlFor="category">Change Category Name:</label>
                            <input className="CategoryDetails__form__input" type="text" name="category" value={categoryName.category} onChange={handleChange} placeholder="Category" required />
                            <button className="CategoryDetails__form__submit-btn" type="submit">Change Name</button>
                        </form>
                    </div>
                </>
            }
        </div>
    );
}

export default CategoryDetails;
