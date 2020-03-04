import React, {useContext} from 'react';
import {Modal} from 'react-bootstrap'

import { CategoryContext } from '../../contexts/category.context';

import '../../styles/DeleteProduct.scss'

const DeleteProduct = (props) => {
    const {deleteCategory} = useContext(CategoryContext);

    // slightly hacky way with this function and the div wrapper. 
    // without this, the link component to go to the categories
    // products will still go through, even if the modal is open and then closed.
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteCategory(props.id)
    }    
  
    const hide = (e) => {
        props.onHide()
    }

    return (
        //this parent div was needed to stop event bubbling. Otherwise once the modal
        // is closed, it would still navigate to the link.
        <div onClick={handleClick}>
            <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={hide}
            show={props.show}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Product
                    </Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    <h5 className="deleteText">
                        Are you sure you want to delete "{props.name}"? This will also
                        delete all corresponding products that are in this category, and it cannot be undone.
                    </h5>
                </Modal.Body>
                <Modal.Footer>  
                    <button className="confirmDelete" onClick={handleDelete}>Yes</button>
                    <button className="cancelDelete" onClick={hide}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
        );
}

export default DeleteProduct;
