import React, { useState, useEffect } from 'react';
import {API} from '../../../utils/API'
import {UserPreferencesManager} from '../../../utils/UserPreferencesManager'
import Modal from 'react-modal';
import ApprovalModal from '../../Common/ApprovalModal'

    const ManageServiceTile = (props)=>{
    const [showRestartModal, setShowRestartModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);
    const [showStopModal, setShowStopModal] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
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
        };

        useEffect(() => {
            let isFav = UserPreferencesManager.isServiceFavourite(props.agent, props.serviceName);
            setIsFavourite(isFav);
            console.log(isFav);
          }, []);

        

        const addToVavourites = ()=>{
            UserPreferencesManager.addServiceToFavourites(props.agent, props.serviceName);
            setIsFavourite(true);
        };

        const removeFromFavourites = ()=>{
            UserPreferencesManager.removeServiceFromFavourites(props.agent, props.serviceName);
            setIsFavourite(false);
        };
    
        const restartServiceHandler = ()=>{
            API.restartService(props.agent, props.serviceName);
            setShowRestartModal(false);
        }
    
        const startServiceHandler = ()=>{
            API.startService(props.agent, props.serviceName);
            setShowStartModal(false);
        }
    
        const stopServiceHandler = ()=>{
            API.stopService(props.agent, props.serviceName);
            setShowStopModal(false);
        }
   
    return (
        <div className="tile">
           <div className="button-wrapper">
                {props.status?.toLowerCase() === "running" ? (
                    <button className="manage-btn" onClick={()=>setShowStopModal(true)} >Stop</button>
                ) : (
                        <button className="manage-btn" onClick={()=>setShowStartModal(true)} >Start</button>
                    )}
                <button className="manage-btn" onClick={()=>setShowRestartModal(true)} >Restart</button>
                {
                    isFavourite?    <button className="manage-btn manage-btn-pushed" onClick={()=>removeFromFavourites()} >Favourites</button>:
                                    <button className="manage-btn" onClick={()=>addToVavourites()} >Favourites</button>
                }
            </div>
            <Modal
                isOpen={showRestartModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <ApprovalModal 
                service={props.serviceName} 
                decline={()=>{hideModal('restart')}}
                message="Are you sure you want to restart service?"
                entity={props.serviceName}
                action={restartServiceHandler}>
                </ApprovalModal>
            </Modal>
            <Modal
                isOpen={showStartModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <ApprovalModal 
                service={props.serviceName} 
                decline={()=>{hideModal('start')}}
                message="Are you sure you want to start service?"
                entity={props.serviceName}
                action={startServiceHandler}>
                </ApprovalModal>
            </Modal>
            <Modal
                isOpen={showStopModal}
                ariaHideApp={false}
                className="agent-modal"
            >
                <ApprovalModal 
                service={props.serviceName} 
                decline={()=>{hideModal('stop')}}
                message="Are you sure you want to stop service?"
                entity={props.serviceName}
                action={stopServiceHandler}>
                </ApprovalModal>
            </Modal>
        </div>
    )
};

export default ManageServiceTile;