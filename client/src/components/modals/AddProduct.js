import React, {useContext} from 'react';

import useMultipleInputs from '../../hooks/useMultipleInputs'

import { ProductsContext } from '../../contexts/products.context';
import {Modal, Alert} from 'react-bootstrap'

import '../../styles/AddProduct.scss'

const AddProduct = (props) => {
  const [newProduct, handleChange, reset] = useMultipleInputs("")
  const { addProduct, msg, error, clearMessages } = useContext(ProductsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(newProduct);
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
            <input type="text" name="sku" onChange={handleChange} value={newProduct.sku} placeholder="SKU" required/>
            <input type="text" name="name" onChange={handleChange} value={newProduct.name} placeholder="Name" required/>
            <input type="text" name="category" onChange={handleChange} value={newProduct.category} placeholder="Category" required/>
            <input type="number" name="price" onChange={handleChange} value={newProduct.price} placeholder="Price" required/>
            <input type="number" name="qty" onChange={handleChange} value={newProduct.qty} placeholder="QTY" required/>
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