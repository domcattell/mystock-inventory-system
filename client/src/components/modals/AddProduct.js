import React, {useContext, useEffect, useState} from 'react';

import useMultipleInputs from '../../hooks/useMultipleInputs'

import { ProductsContext } from '../../contexts/products.context';
import {Modal, Alert} from 'react-bootstrap'

import '../../styles/AddProduct.scss'

const AddProduct = (props) => {
  const [product, handleChange, reset] = useMultipleInputs("")
  const { addProduct, msg, error, clearMessages } = useContext(ProductsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product);
    }

    //calls the hook from parent to hide modal, and clears error messages from context
    const hideModal = () => {
      props.onHide();
      clearMessages();
      reset();
    }

    return (
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="AddProductDialog"
        onHide={hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="AddProductForm" onSubmit={handleSubmit}>
            {error && <Alert className="AddProductError" variant="danger">{msg.error}</Alert>}
            <input type="text" name="sku" onChange={handleChange} value={product.sku} placeholder="SKU" required/>
            <input type="text" name="name" onChange={handleChange} value={product.name} placeholder="Name" required/>
            <input type="text" name="category" onChange={handleChange} value={product.category} placeholder="Category" required/>
            <input type="number" name="qty" onChange={handleChange} value={product.qty} placeholder="QTY" required/>
            <button className="AddProductBtn">Add</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="AddProductCloseBtn" onClick={hideModal}>Close</button>
        </Modal.Footer>
      </Modal>
    );
}

export default AddProduct;