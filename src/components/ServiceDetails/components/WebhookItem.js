import React from "react";
import { useState } from "react/cjs/react.development";
import { API } from "../../../utils/API";
    
const WebhookItem = (props)=>{

    const [displayItem, setDispalyItem] = useState(true);

    const deleteWebhookHandler = ()=>{
        
        API.deleteNotifier(props.agent, props.service, props.receiver)
        .then(response=>{
            console.log(response);
            if(response.status >= 200 & response.status<300){
                console.log("weszło");
                setDispalyItem(false);
                console.log(displayItem);
            }
        });
    };

    const item = (
        <div className="webhook-item">
            <span className="webhook-type">{props.type}</span>
                <input 
                className="sink-input"
                placeholder="receiver"
                type="text" 
                value={props.receiver}
                onChange={(e)=>{console.log("fsdfsdf")}}
                >
                </input>
                <p 
                className="gadget-btn webhook-setting-btn setting-delete-btn"
                onClick={deleteWebhookHandler}
                >x</p>
        </div>
    )

    return displayItem ? item : null;
};
export default WebhookItem;