import React from 'react';
import Modal from 'react-modal';
import greenBell from '../icons/green_bell.png'
import redBell from '../icons/red_bell.png'


const EventPushModal = (props)=>{
    const onAfterModalOpenHandler = ()=>{
        setTimeout(function(){props.closeAction(false)}, 5000);
      }
    

    return (
        <Modal 
        isOpen={props.isOpen} 
        overlayClassName="event-modal-overlay"
        closeTimeoutMS={2000}
        onAfterOpen={onAfterModalOpenHandler}
        style={{
          overlay:{
            backgroundColor: 'rgba(0,100,0,0)',
            inset:"60vh 75vw", 
            position:'fixed',
          }, 
          content:{
                  border:"0px",
                  background:'rgba(0,0,100,0)',
                  height:200,
                  width:400
                  }}}
      >
         <div className="push-event-modal">
            <span>{props.event?.service}</span>
            <span>{props.event?.agent}</span>
            
            {
                props.event?.status.toLowerCase() === 'running' ? (
                <div className="push-event-column">
                    <img width={50} src={greenBell}/><span>has started</span>
                </div>) : (
                <div className="push-event-column">
                    <img width={50} src={redBell}/><span>has stopped</span>
                </div>)
            }
        </div>
      </Modal>
    )
}

export default EventPushModal;