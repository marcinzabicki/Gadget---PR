import { API } from '../../utils/API'
import React, { useState } from 'react';
import Modal from 'react-modal';
import RestartModal from './RestartModal';
import { Link } from "react-router-dom";

const Service = ({ service, index, agent }) => {
    const [extendText, setExtendText] = useState(false);
    const [showModal, setShowModal] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'transparent';


    const showModalHandler = () => {
        let isShowing = showModal;
        setShowModal(!isShowing);
    };

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
                    <button className="button" onClick={() => API.stopService(agent, service.name)} >Stop</button>
                ) : (
                        <button className="button" onClick={() => API.startService(agent, service.name)} >Start</button>
                    )}
                <button className="button" onClick={showModalHandler} >Restart</button>
                <Link to={`/${agent}/${service.name}`}>
                <button className="button special">More</button>
                </Link>
            </div>

            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <RestartModal service={service} decline={showModalHandler}></RestartModal>
            </Modal>
        </div>
    )
}

export default Service;