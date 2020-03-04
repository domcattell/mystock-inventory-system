import React, {useContext} from 'react';
import {Toast} from 'react-bootstrap';

import { ProductsContext } from '../../contexts/products.context';

const ToastMessage = (props) => {

    const {msg, clearMessages} = useContext(ProductsContext)

    //toggle the toast state to false, and clear the server message
    const closeToast = () => {
        props.toggleToast();
        clearMessages();
    }

    return (
        <Toast 
            show={props.showToast} 
            onClose={closeToast} 
            style={{position: "absolute", top: 5, right: 5}} 
            delay={3000} 
            autohide
        >
        <Toast.Header>
            <strong className="mr-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>{msg.success ? msg.success : msg.error}</Toast.Body>
        </Toast>
    );
}

export default ToastMessage;
