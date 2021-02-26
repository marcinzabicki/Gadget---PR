import React, { useState} from "react";
import Helpers from '../../../utils/Helpers';
import { API } from "../../../utils/API";
    
    const NewWebhookItem = (props)=>{
        const [webhook, setWebhook] = useState("undef");
        const [receiver, setReceiver] = useState("");

        const changeTypeHandler = (e)=>{
            let w = e.target.value;
            setWebhook(w)
            console.log(webhook)
        }

        const createNotifierHandler = ()=>{
            
        }
    return (
        <div className="webhook-item">
            <select
            className="webhook-type"
            onChange={changeTypeHandler}>
                {
                    props.types.map((t,i)=>{
                       return (<option key={i} value={t["key"]}>{Helpers.upperFirst(t["name"])}</option>)
                    })
                }
            </select>
                <input 
                className="sink-input"
                placeholder="receiver"
                type="text" 
                value={receiver}
                onChange={(e)=>{setReceiver(e.target.value)}}
                >
                </input>
                <p 
                className="gadget-btn webhook-setting-btn setting-accept-btn"
                onClick={()=> {API.createNotifier(props.agent, props.service, receiver, webhook )}}
                >&#10003;</p>
                <p 
                className="gadget-btn webhook-setting-btn setting-delete-btn"
                onClick={()=>{props.deleteClick(props.index)}}
                >x</p>
        </div>
    )
};
export default NewWebhookItem;