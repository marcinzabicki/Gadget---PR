import React from "react";
import { useState } from "react/cjs/react.development";
import { API } from "../../../utils/API";
import ApprovalModal from '../../Common/Modals/ApprovalModal'
import Modal from 'react-modal';
    
const WebhookItem = (props)=>{
    Modal.defaultStyles.overlay.backgroundColor = 'transparent';
    const [displayItem, setDispalyItem] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const deleteWebhookHandler = ()=>{
        
        API.deleteNotifier(props.agent, props.service, props.receiver)
        .then(response=>{
            console.log(response);
            if(response.status >= 200 & response.status<300){
                setDispalyItem(false);
                setShowModal(false);
            }
        });
    };

    const declineHandler = ()=> {setShowModal(false)};

    const item = (
        <div className="webhook-item">
            <span className="webhook-type">{props.type}</span>
                <input 
                className="sink-input"
                placeholder="receiver"
                type="text" 
                value={props.receiver}
                onChange={(e)=>{console.log("fsdfsdf")}}
                >
                </input>
                <p 
                className="gadget-btn webhook-setting-btn setting-delete-btn"
                onClick={()=>{setShowModal(true)}}
                >x</p>
        </div>
    )

    const modal =( 
        <Modal
        isOpen={showModal}
        ariaHideApp={false}
        className="agent-modal">
            <ApprovalModal
                decline={declineHandler}
                message="Are you sure you want to delete this notifier"
                entity=""
                action={deleteWebhookHandler}>
            </ApprovalModal>
        </Modal>
        );

    return (
        <div>
            <div>{displayItem ? item : null}</div>
            <div>{modal}</div>
        </div>
        );
};
export default WebhookItem;