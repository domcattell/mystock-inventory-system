import React, { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import useToggle from '../../hooks/useToggle';
import useInputState from '../../hooks/useInputState';

import { ProductsContext, ProductsActionsContext } from '../../contexts/products.context';
import { CategoryContext, CategoryActionsContext } from '../../contexts/category.context';

import ToastMessage from '../layout/ToastMessage';

import '../../styles/modals/AddProduct.scss'
import { CATEGORIES_LOADING } from '../../actions/types';

const AddProduct = (props) => {
  const { categories } = useContext(CategoryContext);
  const { getCategories } = useContext(CategoryActionsContext);
  const { addProduct, clearProductMessages } = useContext(ProductsActionsContext);
  const { productsMsg } = useContext(ProductsContext);
  const [toast, setToast] = useToggle(false);
  const [newProduct, handleChange, reset] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    !toast && setToast();
  }

  useEffect(() => {
    if(categories.length === 0) {
      getCategories();
    }
  }, [])

  const hideModal = () => {
    props.onHide();
    toast && setToast()
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
          Add Product
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="AddProduct__form" onSubmit={handleSubmit}>
          <label className="AddProduct__form__label" htmlFor="name">Product Name:</label>
          <input className="AddProduct__form__text" type="text" onChange={handleChange} name="name" value={newProduct.name} required />

          <label className="AddProduct__form__label" htmlFor="category">Category:</label>
          <select className="AddProduct__form__text" value={newProduct.category} name="category" onChange={handleChange} required>
            <option defaultValue="" hidden></option>
            {categories.map(c => (
              <option key={c.category} value={c.category}>{c.category}</option>
            ))}
          </select>

          <div className="AddProduct__form__input-wrapper">
            <label className="AddProduct__form__label" htmlFor="price">Price:</label>
            <input className="AddProduct__form__number" type="number" onChange={handleChange} name="price" value={newProduct.price} required />
          </div>

          <div className="AddProduct__form__input-wrapper">
            <label className="AddProduct__form__label" htmlFor="qty">Quantity:</label>
            <input className="AddProduct__form__number" type="number" onChange={handleChange} name="qty" value={newProduct.qty} required />
          </div>

          <button className="AddProduct__form__btn">Add</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="AddProduct__close-btn" onClick={hideModal}>Close</button>
      </Modal.Footer>
      {productsMsg ? <ToastMessage
        title="New Product"
        message={productsMsg}
        showToast={toast}
        toggleToast={setToast}
        clear={clearProductMessages}
      /> : null}
    </Modal>
  );
}

export default AddProduct;