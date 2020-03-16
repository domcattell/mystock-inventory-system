import React, { memo } from 'react';
import { Toast } from 'react-bootstrap';

const ToastMessage = (props) => {
    const { toggleToast, clear, showToast, message } = props;

    //toggle the toast state to false, and clear the server message
    const closeToast = () => {
        toggleToast();
        clear();
    }

    return (
        <Toast
            show={showToast}
            onClose={closeToast}
            style={{ top: 50, right: 5, position: "fixed" }}
            delay={5000}
            autohide
        >
            <Toast.Header>
                {/* conditional ternary operator used to display either "success" or "error" 
            as the header depending on the server message. This could also be it's own
            function that returns the message based on the props.message object */}
                <strong className="mr-auto">{
                    message.success ?
                        "Success" :
                        message.error
                        && "Error "}
                </strong>
            </Toast.Header>
            {/* Same as the header, but instead displays the server message */}
            <Toast.Body>{
                message.success ?
                    message.success :
                    message.error
                    && message.error}
            </Toast.Body>
        </Toast>
    );
}

export default memo(ToastMessage);
