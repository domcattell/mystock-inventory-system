import React, {useContext} from 'react';

import { CategoryContext } from '../../contexts/category.context';

import useInputState from '../../hooks/useInputState';
import useToggle from '../../hooks/useToggle';

import ToastMessage from '../layout/ToastMessage';

import '../../styles/forms/EditCategoryForm.scss'

const EditCategoryForm = (props) => {
    const {categoryMsg, clearCategoryMessages, editCategory} = useContext(CategoryContext);
    const [categoryName, handleChange] = useInputState("");
    const [toast, setToast] = useToggle(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        editCategory(categoryName, props.match.params.id);
        toast == false && setToast();
    }

    return (
        <div className="EditCategoryForm__form-wrapper">
            <form className="EditCategoryForm__form" onSubmit={handleSubmit}>
                <label className="EditCategoryForm__label" htmlFor="category">Change Category Name:</label>
                <input className="EditCategoryForm__input" type="text" name="category" value={categoryName.category} onChange={handleChange} placeholder="Category" required />
                <button className="EditCategoryForm__submit-btn" type="submit">Change Name</button>
            </form>
            {categoryMsg && <ToastMessage 
                    title="Update Status" 
                    message={categoryMsg} 
                    showToast={toast}
                    toggleToast={setToast}
                    clear={clearCategoryMessages}
                />}
        </div>
    );
}

export default EditCategoryForm;
