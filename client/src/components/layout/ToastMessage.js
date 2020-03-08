import React from 'react';
import {Toast} from 'react-bootstrap';

const ToastMessage = (props) => {

    //toggle the toast state to false, and clear the server message
    const closeToast = () => {
        props.toggleToast();
        props.clear();
    }

    return (
        <Toast 
            show={props.showToast} 
            onClose={closeToast} 
            style={{position: "absolute", top: 50, right: 5, position: "fixed"}} 
            delay={5000} 
            autohide
        >
        <Toast.Header>
            {/* conditional ternary operator used to display either "success" or "error" 
            as the header depending on the server message. This could also be it's own
            function that returns the message based on the props.message object */}
            <strong className="mr-auto">{
                props.message.success ? 
                "Success" : 
                props.message.error 
                && "Error "}
            </strong>
        </Toast.Header>
        {/* Same as the header, but instead displays the server message */}
        <Toast.Body>{
            props.message.success ? 
            props.message.success : 
            props.message.error 
            && props.message.error}
        </Toast.Body> 
        </Toast>
    );
}

export default ToastMessage;
