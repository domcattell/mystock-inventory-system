import React from 'react';
import {withRouter} from 'react-router-dom';
import {Modal} from 'react-bootstrap'

import '../../styles/modals/DeleteModal.scss'

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
                    <h5 className="DeleteModal__header">
                        Are you sure you want to delete? This cannot be un-done
                    </h5>
                </Modal.Body>
                <Modal.Footer>  
                    <button className="DeleteModal__confirm-btn" onClick={handleDelete}>Yes</button>
                    <button className="DeleteModal__cancel-btn" onClick={props.onHide}>No</button>
                </Modal.Footer>
            </Modal>
        );
}

export default withRouter(DeleteProduct);
