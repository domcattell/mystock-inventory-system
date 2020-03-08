import React, {useContext, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import useMultipleInputs from '../../hooks/useMultipleInputs';
import useToggle from '../../hooks/useToggle';

import { ProductsContext } from '../../contexts/products.context';
import {CategoryContext} from '../../contexts/category.context';

import ToastMessage from '../layout/ToastMessage';

import '../../styles/AddProduct.scss'

const AddProduct = (props) => {
  const [newProduct, handleChange, reset] = useMultipleInputs("");
  const [toast, setToast] = useToggle(false);
  const { addProduct, msg, clearMessages } = useContext(ProductsContext);
  const {categories, getCategories} = useContext(CategoryContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(newProduct);
        !toast && setToast();
    }

    useEffect(() => {
      getCategories();
    },[])

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
            <input className="AddProduct__form__text" type="text" onChange={handleChange} name="name" value={newProduct.name} required/>

            <label className="AddProduct__form__label" htmlFor="category">Category:</label>
            <select className="AddProduct__form__text" value={newProduct.category} name="category" onChange={handleChange} required>
              <option defaultValue="" hidden></option>
              {categories.map(c => (
                  <option key={c.category} value={c.category}>{c.category}</option>
              ))}
            </select>
            
            <div className="AddProduct__form__input-wrapper">
              <label className="AddProduct__form__label" htmlFor="price">Price:</label>
              <input className="AddProduct__form__number" type="number" onChange={handleChange} name="price" value={newProduct.price} required/>
            </div>
            
            <div className="AddProduct__form__input-wrapper">
              <label className="AddProduct__form__label" htmlFor="qty">Quantity:</label>
              <input className="AddProduct__form__number" type="number" onChange={handleChange} name="qty" value={newProduct.qty} required/>
            </div>

            <button className="AddProduct__form__btn">Add</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="AddProduct__close-btn" onClick={hideModal}>Close</button>
        </Modal.Footer>
        {msg ? <ToastMessage 
          title="New Product"
          message={msg}
          showToast={toast}
          toggleToast={setToast}
          clear={clearMessages}
        /> : null}
      </Modal>
    );
}

export default AddProduct;