import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {Modal} from 'react-bootstrap'

import '../../styles/DeleteProduct.scss'

const DeleteProduct = (props) => {
    const handleDelete = (e) => {
        e.preventDefault();
        props.deleteFunction(props.id);
        props.history.goBack();
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
                        Delete Warning
                    </Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    <h5 className="deleteText">
                        Are you sure you want to delete this category? This will also
                        delete all corresponding products that are in the category, and cannot be undone.
                    </h5>
                </Modal.Body>
                <Modal.Footer>  
                    <button className="confirmDelete" onClick={handleDelete}>Yes</button>
                    <button className="cancelDelete" onClick={props.onHide}>No</button>
                </Modal.Footer>
            </Modal>
        );
}

export default withRouter(DeleteProduct);
