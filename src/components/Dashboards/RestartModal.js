import React from 'react';
import {API} from '../../utils/API'

const RestartModal = ({ service, index, agent,  props })=>{
    return (
        <div className="restart-popup">
            <span>Czy zrestartować usługę</span>
            <span>{service.name}</span>
            <div>
                <div id="restart-yes">
                    <button className="restart-button-yes" onClick={()=>API.restartService(service.id)}>TAK</button>
                </div>
                <div id="restart-no">
                    <button className="restart-button-no" onClick="">NIE</button>
                </div>
            </div>
        </div>
    )
}

export default RestartModal;