import React, { useState, useEffect, useContext } from "react";
import Helpers from '../../../utils/Helpers';
import { API } from "../../../utils/API";
    
    const WebhookItem = (props)=>{
    return (
        <div className="webhook-item">
            <span className="webhook-type">{Helpers.upperFirst(props.type)}</span>
                <input 
                className="sink-input"
                placeholder="receiver"
                type="text" 
                value={props.receiver}
                onChange={(e)=>{console.log("fsdfsdf")}}
                >
                </input>
                {/* <p 
                className="gadget-btn webhook-setting-btn setting-accept-btn"
                onClick={()=> {console.log("lucekekekeke")}}
                >&#10003;</p> */}
                <p 
                className="gadget-btn webhook-setting-btn setting-delete-btn"
                onClick={()=>{API.deleteNotifier(props.agent, props.service, props.receiver)}}
                >x</p>
        </div>
    )
};
export default WebhookItem;