import {API} from '../../utils/API'
import React, { useState } from 'react';
import Modal from 'react-modal';
import RestartModal from './RestartModal';



const Service = ({ service, index, agent,  props }) => {
    const [extendText, setExtendText] = useState(false);
    const [showModal, setShowModal] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'transparent';
    Modal.defaultStyles.overlay.userSelect = 'none'

   const showModalHandler = ()=>{
        let isShowing = showModal;
        setShowModal(!isShowing);
      };

    return (
        <div key={service.name + index} className="service">
            <div className="service-wrapper">
                <p onClick={() => setExtendText(!extendText)} className="text service-name" style={extendText === true ? { overflow: "visible", maxHeight: "none" } : { overflow: "hidden" }}> {service.name}</p>
                <div className={`service-status ${service.status}`}>
                    <p>{service.status}</p>
                </div>
                <p className="text service-more">{service.logOnAs.substring(0,20)}</p>
                <p onClick={() => setExtendText(!extendText)} className="text service-more" style={extendText === true ? { overflow: "visible", maxHeight: "none" } : { overflow: "hidden" }}> {service.description}</p>
            </div>
            <div className="button-wrapper">
                {service.status.toLowerCase()==="running" ? (
                        <button className="button" onClick={()=>API.stopService(agent,service.name)} >Stop</button>
                ) : (
                    <button className="button" onClick={()=>API.startService(agent,service.name)} >Start</button>
                ) }
                <button className="button" onClick={showModalHandler} >Restart</button>
                <button className="button special">Show logs</button>
            </div>
            
            <Modal
          isOpen={showModal}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          // style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
          className="agent-modal"
        >
         <RestartModal service={service} decline={showModalHandler}></RestartModal>
        </Modal>
        </div>
    )
}

export default Service;