import React, {useContext, useEffect} from 'react';
import ReactLoading from 'react-loading';

import {CategoryContext} from '../contexts/category.context';
import {ProductsContext} from '../contexts/products.context';

import useInputState from '../hooks/useInputState';

import '../styles/CategoryDetails.scss';

const CategoryDetails = (props) => {
    const {category, editCategory, categoriesFetching} = useContext(CategoryContext);
    const {products} = useContext(ProductsContext);
    const [categoryName, handleChange, reset] = useInputState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        editCategory(categoryName, props.match.params.id); 
        props.toast == false && props.setToast();
    }

    return (
        <div className={`CategoryDetailsRoot ${categoriesFetching && "loading"}`}>
            {categoriesFetching ? <ReactLoading type="bars" color="gray" /> :
            <>
                <div className="CategoryDetails">
                    <h5 className="CategoryDetailsHeader">Category Details</h5>
                    <ul className="CategoryDetailsList">
                        <li className="CategoryDetailsItem">
                            <span className="CategoryDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Category Name</span>
                            <span className="CategoryDetailsContent">{category.category}</span>
                        </li>

                        <li className="CategoryDetailsItem">
                            <span className="CategoryDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Total amount of products currently in {category.category} </span>
                            <span className="CategoryDetailsContent">{products.length}</span>
                        </li>

                        <li className="CategoryDetailsItem">
                            <span className="CategoryDetailsTitle"><i className="fas fa-chevron-circle-right"></i>Category ID </span>
                            <span className="CategoryDetailsContent">{category.id}</span>
                        
                        </li>
                    </ul>
                </div>
                <div className="CategoryDetailsFormWrapper">
                    <form className="CategoryDetailsForm" onSubmit={handleSubmit}>
                        <label className="CategoryDetailsFormLabel" htmlFor="category">Change Category Name:</label>
                        <input className="CategoryDetailsInput" type="text" name="category" value={categoryName.category} onChange={handleChange} placeholder="Category" required/>
                        <button className="CategoryDetailsBtn" type="submit">Change Name</button>
                    </form>
                </div>
            </>
            }
        </div>
    );
}

export default CategoryDetails;
