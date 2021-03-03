import { API } from '../../utils/API'
import React, { useState } from 'react';
import Modal from 'react-modal';
import ApprovalModal from '../Common/ApprovalModal'
import { Link } from "react-router-dom";

const ServiceMobile = ({ agent, service, index }) => {
    const [showRestartModal, setShowRestartModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);
    const [showStopModal, setShowStopModal] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'transparent';

    const hideModal = (name)=>{
        switch(name) {
           case 'restart' : setShowRestartModal(false);
           break;
           case 'start': setShowStartModal(false);
           break;
           case'stop':setShowStopModal(false);
           break;
        }
    }

    const restartServiceHandler = ()=>{
        API.restartService(agent,service.name);
        setShowRestartModal(false);
    }

    const startServiceHandler = ()=>{
        API.startService(agent,service.name);
        setShowStartModal(false);
    }

    const stopServiceHandler = ()=>{
        API.stopService(agent,service.name);
        setShowStopModal(false);
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
                            <button className="button" onClick={()=>setShowStopModal(true)} >Stop</button>
                        ) : (
                                <button className="button" onClick={()=>setShowStartModal(true)} >Start</button>
                            )}

                        <button className="button" onClick={()=>setShowRestartModal(true)}>Restart</button>
                        <Link to={`/${agent}/${service.name}`}>
                            <button className="button special">More</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showRestartModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <ApprovalModal 
                service={service.name} 
                decline={()=>{hideModal('restart')}}
                message="Are you sure you want to restart service?"
                entity={service.name}
                action={restartServiceHandler}>
                </ApprovalModal>
            </Modal>
            <Modal
                isOpen={showStartModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <ApprovalModal 
                service={service.name} 
                decline={()=>{hideModal('start')}}
                message="Are you sure you want to start service?"
                entity={service.name}
                action={startServiceHandler}>
                </ApprovalModal>
            </Modal>
            <Modal
                isOpen={showStopModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <ApprovalModal 
                service={service.name} 
                decline={()=>{hideModal('stop')}}
                message="Are you sure you want to stop service?"
                entity={service.name}
                action={stopServiceHandler}>
                </ApprovalModal>
            </Modal>
        </>
    )
}

export default ServiceMobile;