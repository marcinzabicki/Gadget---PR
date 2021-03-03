import { API } from '../../utils/API'
import React, { useState } from 'react';
import Modal from 'react-modal';
import ApprovalModal from '../Common/ApprovalModal'
import { Link } from "react-router-dom";

const Service = ({ service, index, agent }) => {
    const [extendText, setExtendText] = useState(false);
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
        <div key={service.name + index} className="service">
            <div className="service-wrapper">
                <Link to={`/${agent}/${service.name}`} className="link service-name">
                    <p>{service.name}</p>
                </Link>
                <div className={`service-status ${service.status}`}>
                    <p>{service.status}</p>
                </div>
                <p className="text service-more">{service.logOnAs.substring(0, 20)}</p>
                <p onClick={() => setExtendText(!extendText)} className="text service-more" style={extendText === true ? { overflow: "visible", maxHeight: "none" } : { overflow: "hidden" }}> {service.description}</p>
            </div>
            <div className="button-wrapper">
                {service.status.toLowerCase() === "running" ? (
                    <button className="button" onClick={()=>setShowStopModal(true)} >Stop</button>
                ) : (
                        <button className="button" onClick={()=>setShowStartModal(true)} >Start</button>
                    )}
                <button className="button" onClick={()=>setShowRestartModal(true)} >Restart</button>
                <Link to={`/${agent}/${service.name}`}>
                <button className="button special">More</button>
                </Link>
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
        </div>
    )
}

export default Service;