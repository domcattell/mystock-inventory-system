import React, {useContext} from 'react';
import {Modal} from 'react-bootstrap'

import { ProductsContext} from '../../contexts/products.context'

import '../../styles/DeleteProduct.scss'

const DeleteProduct = (props) => {
    const {deleteProduct} = useContext(ProductsContext)

    const handleDelete = () => {
        deleteProduct(props.id)
        props.history.push("/products/all")
    }    
  
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="deleteText">Are you sure you want to delete "{props.productName}"?</h5>
            </Modal.Body>
            <Modal.Footer>
                <button className="confirmDelete" onClick={handleDelete}>Yes</button>
                <button className="cancelDelete" onClick={props.onHide}>No</button>
            </Modal.Footer>
        </Modal>
        );
}

export default DeleteProduct;
