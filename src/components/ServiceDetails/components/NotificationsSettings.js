import React, { useState } from "react";
import WebhookItem from './WebhookItem';
import NewWebhookItem from './NewWebhookItem';
import Helpers from "../../../utils/Helpers";
// import Switch from "react-switch";
// import Helpers from '../../../utils/Helpers';
    
    const NotificationSettings = (props)=>{
    const [newNotifers, setNewNotifiers] = useState([]);
    
    const addNewNotifierHandler = ()=>{
        let update = [...newNotifers];
        let index = Helpers.generateUID();
        update.push({agent:props.agent, service:props.service, types:props.types, index:index});
        setNewNotifiers(update);
    }

    function deleteNewNotifierHandler(k){
        let update = [...newNotifers];
        console.log(k);
        console.log(update);
        let deleted = update.filter(function(o) {
            return o.index !== k;
          });
          console.log("deleted:")
          console.log(deleted);
        setNewNotifiers(deleted);
    };

    const notifiers = props.notifiers?.map((n, i) => {
        return (
            <WebhookItem 
            key={i}
            receiver={n.receiver}
            type={n.type}
            agent={props.agent}
            service={props.service}
            ></WebhookItem>
        )
    });

    const newN = newNotifers?.map((n, i) => {
        return (
            <NewWebhookItem 
            key={i}
            index={n.index}
            types={props.types}
            agent={props.agent}
            service={props.service}
            deleteClick={deleteNewNotifierHandler}
            ></NewWebhookItem>
        )
    });
    

    return (
        <div className="notifications-settings tile">
            <div className="notifications-head-wrapper">
            <h1>Enable Notifications</h1>
            <div className="apply-btn-wrapper">
                <p 
                className="gadget-btn webhook-setting-btn setting-accept-btn"
                onClick={addNewNotifierHandler}>+</p>
            </div>
            </div>
            
            {notifiers}
            {newN}
            
        </div>
    )
}
export default NotificationSettings;




/* <Switch
                    onChange={() => {console.log("gfgdf")}}
                    offColor="#707070"
                    onColor="#38E18D"
                    width={52}
                    height={19}
                    handleDiameter={16}
                /> */