import {API} from '../../utils/API'
import React, { useState } from 'react';
import '../../styles/services.css'


const Service = ({ service, index, agent,  props }) => {
    const [extendText, setExtendText] = useState(false);
    return (
        <div key={service.name + index} className="service">
            <div className="service-wrapper">
                <p onClick={() => setExtendText(!extendText)} className="text service-name" style={extendText == true ? { overflow: "visible", maxHeight: "none" } : { overflow: "hidden" }}> {service.name}</p>
                <div className={`service-status ${service.status}`}>
                    <p>{service.status}</p>
                </div>
                <p className="text service-more">{service.logOnAs.substring(0,20)}</p>
                <p onClick={() => setExtendText(!extendText)} className="text service-more" style={extendText == true ? { overflow: "visible", maxHeight: "none" } : { overflow: "hidden" }}> {service.description}</p>
            </div>
            <div className="button-wrapper">
                {service.status.toLowerCase()==="running" ? (
                        <button className="button" onClick={()=>API.stopService(agent,service.name)} >Stop</button>
                ) : (
                    <button className="button" onClick={()=>API.startService(agent,service.name)} >Start</button>
                ) }
                
                <button className="button" onClick={()=>API.startService(service.id)} >Restart</button>
                <button className="button special">Show logs</button>
            </div>
        </div>
    )
}

export default Service;