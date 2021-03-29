import React from 'react';
// remember to add in the parent:
// decline and actions handler
// Modal.defaultStyles.overlay.backgroundColor = 'transparent'; set background
// wrap it in <Modal> from react-modal and set isOpen value
const ApprovalModal = (props)=>{
    
    return (
        <div className="restart-modal">
            <span>{props.message}</span>
            <span>{props.entity}</span>
            <div>
                <p className="restart-button restart-button-yes" onClick={props.action}>YES</p>
                <p className="restart-button restart-button-no" onClick={props.decline}>NO</p>
            </div>
        </div>
    )
}

export default ApprovalModal;