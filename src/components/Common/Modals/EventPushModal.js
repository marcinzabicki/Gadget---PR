import React from 'react';
import greenBell from '../icons/green_bell.png'
import redBell from '../icons/red_bell.png'


const EventPushModal = (props)=>{
    console.log(props.event)
    return (
        <div className="push-event-modal">
            <span>{props.event?.service}</span>
            <span>{props.event?.agent}</span>
            
            {
                props.event.status?.toLowerCase() === 'running' ? (
                <div className="push-event-column">
                    <img width={50} src={greenBell}/><span>has started</span>
                </div>) : (
                <div className="push-event-column">
                    <img width={50} src={redBell}/><span>has stopped</span>
                </div>)
            }
        </div>
    )
}

export default EventPushModal;