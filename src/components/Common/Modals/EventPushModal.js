import React from 'react';
import greenBell from '../icons/green_bell.png'
import redBell from '../icons/red_bell.png'


const EventPushModal = (props)=>{
    
    return (
        <div className="push-event-modal">
            <span>{props.service}</span>
            <span>{props.agent}</span>
            
            {
                props.status === 'running' ? (
                <div className="push-event-column">
                    <img width={50} src={greenBell}/><span>has started</span>
                </div>) : (
                <div>
                    <img width={50} src={redBell}/><span>has stopped</span>
                </div>)
            }
        </div>
    )
}

export default EventPushModal;