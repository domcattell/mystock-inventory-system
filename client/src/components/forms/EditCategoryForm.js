import React, {useContext} from 'react';

import { CategoryContext } from '../../contexts/category.context';

import useInputState from '../../hooks/useInputState';

import '../../styles/forms/EditCategoryForm.scss'

const EditCategoryForm = (props) => {
    const { editCategory, fetchingCategories } = useContext(CategoryContext);
    const [categoryName, handleChange] = useInputState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        editCategory(categoryName, props.match.params.id);
        props.toast == false && props.setToast();
    }

    return (
        <div className="EditCategoryForm__form-wrapper">
            <form className="EditCategoryForm__form" onSubmit={handleSubmit}>
                <label className="EditCategoryForm__label" htmlFor="category">Change Category Name:</label>
                <input className="EditCategoryForm__input" type="text" name="category" value={categoryName.category} onChange={handleChange} placeholder="Category" required />
                <button className="EditCategoryForm__submit-btn" type="submit">Change Name</button>
            </form>
        </div>
    );
}

export default EditCategoryForm;
