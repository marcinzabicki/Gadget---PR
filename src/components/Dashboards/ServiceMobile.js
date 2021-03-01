import { API } from '../../utils/API'
import React, { useState } from 'react';
import Modal from 'react-modal';
import ApprovalModal from '../Common/ApprovalModal'

const ServiceMobile = ({ agent, service, index }) => {
    const [showModal, setShowModal] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'transparent';

    const showModalHandler = () => {
        let isShowing = showModal;
        setShowModal(!isShowing);
    };

    const restartServiceHandler = ()=>{
        API.restartService(agent,service.name);
        setShowModal(false);
    }

    return (
        <>
            <div key={service.name + index} className="service-mobile">
                <div className={`service-status-mobile ${service.status}`}>
                </div>
                <div className="buttons-wrapper-mobile">
                    <p className="service-name-mobile">{service.name}</p>
                    <div>
                        {service.status.toLowerCase() === "running" ? (
                            <button className="button" onClick={() => API.stopService(agent, service.name)} >Stop</button>
                        ) : (
                                <button className="button" onClick={() => API.startService(agent, service.name)} >Start</button>
                            )}

                        <button className="button" onClick={showModalHandler}>Restart</button>
                        <button className="button special">Show logs</button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <ApprovalModal 
                service={service.name} 
                decline={showModalHandler}
                message="Are you sure you want to restart service?"
                entity={service.name}
                action={restartServiceHandler}>
                </ApprovalModal>
            </Modal>
        </>
    )
}

export default ServiceMobile;