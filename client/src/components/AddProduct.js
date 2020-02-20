import React, {useContext, useEffect, useState} from 'react';
import useMultipleInputs from '../hooks/useMultipleInputs'
import { ProductsContext } from '../contexts/products.context';
import Axios from 'axios';
import {Modal} from 'react-bootstrap'
import '../styles/AddProduct.scss'

const AddProduct = (props) => {
  const [product, handleChange, reset] = useMultipleInputs("")
  const { addProduct, msg, error, clearMessages } = useContext(ProductsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product)
        reset();
    }

    return (
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="AddProductDialog"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {error && <p className="AddProductError">{msg.error}</p>}
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="AddProductForm" onSubmit={handleSubmit}>
            <input type="text" name="sku" pattern='[0-9]+' onChange={handleChange} value={product.sku} placeholder="SKU" required/>
            <input type="text" name="name" onChange={handleChange} value={product.name} placeholder="Name" required/>
            <input type="text" name="category" onChange={handleChange} value={product.category} placeholder="Category" required/>
            <input type="number" name="qty" onChange={handleChange} value={product.qty} placeholder="QTY" required/>
            <button className="AddProductBtn">Add</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="AddProductCloseBtn" onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
}

export default AddProduct;