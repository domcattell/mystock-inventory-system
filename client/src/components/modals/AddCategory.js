import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';

import { CategoryContext, CategoryActionsContext } from '../../contexts/category.context';

import ToastMessage from '../layout/ToastMessage';

import useInputState from '../../hooks/useInputState';
import useToggle from '../../hooks/useToggle';

import '../../styles/modals/AddCategory.scss';

const AddCategory = (props) => {
  const [newCategory, handleChange, reset] = useInputState("");
  const [toast, setToast] = useToggle(false);
  const { categoryMsg } = useContext(CategoryContext);
  const { addCategory, clearCategoryMessages } = useContext(CategoryActionsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(newCategory);
    !toast && setToast();
  }

  const hideModal = () => {
    props.onHide();
    clearCategoryMessages();
    toast && setToast();
    reset();
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="AddCategory__form" onSubmit={handleSubmit}>
            <label className="AddCategory__form__label" htmlFor="category">Category:</label>
            <input className="AddCategory__form__input" type="text" name="category" onChange={handleChange} value={newCategory.category} required />
            <button className="AddCategory__form__btn" type="submit" >Add</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="AddCategory__close-btn" onClick={hideModal}>Close</button>
      </Modal.Footer>
      {categoryMsg ? <ToastMessage
        title="New Category"
        message={categoryMsg}
        showToast={toast}
        toggleToast={setToast}
        clear={clearCategoryMessages}
      /> : null}
    </Modal>
  );
}

export default AddCategory;
