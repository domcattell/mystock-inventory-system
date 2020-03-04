import React, {useContext} from 'react';

import { CategoryContext } from '../../contexts/category.context';

import useInputState from '../../hooks/useInputState';

import {Modal, Alert} from 'react-bootstrap';

import '../../styles/AddCategory.scss';

const AddCategory = (props) => {
    const [newCategory, handleChange, reset] = useInputState("");
    const {addCategory, categoryMsg, clearCategoryMessages, categoryError} = useContext(CategoryContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory(newCategory);
    }

    const hideModal = () => {
        props.onHide();
        clearCategoryMessages();
        reset();
    }

    console.log(categoryMsg)
    
    return (
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // dialogClassName="AddProductDialog"
        onHide={hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="AddCategoryForm" onSubmit={handleSubmit}>
            {categoryError && <Alert className="AddCategoryError" variant="danger">{categoryMsg.error}</Alert>}
            <div className="AddCategoryFormWrapper">
              <input type="text" className="AddCategoryInput" name="category" onChange={handleChange} value={newCategory.category} placeholder="Category" required/>
              <button className="AddCategoryBtn" type="submit" >Add</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="AddCategoryCloseBtn" onClick={hideModal}>Close</button>
        </Modal.Footer>
      </Modal>
    );
}

export default AddCategory;
