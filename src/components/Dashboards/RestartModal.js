import React from 'react';
import {API} from '../../utils/API'

const RestartModal = ({ service, index, agent, decline })=>{
    const restartServiceHandler = ()=>{
        API.restartService(agent,service.name)
        decline();
    };

    return (
        <div className="restart-modal">
            <span>Czy zrestartować usługę</span>
            <span>{service.name}</span>
            <div>
                <p className="restart-button restart-button-yes" onClick={restartServiceHandler}>TAK</p>
                <p className="restart-button restart-button-no" onClick={decline}>NIE</p>
            </div>
        </div>
    )
}

export default RestartModal;