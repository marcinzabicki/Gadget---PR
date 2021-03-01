import React, { useState, useEffect} from "react";
import Helpers from '../../../utils/Helpers';
import { API } from "../../../utils/API";
    
    const NewWebhookItem = (props)=>{
        const [receiver, setReceiver] = useState("");
        const [webhook, setWebhook] = useState(-1);
        const [displayCreateButton,setDisplayCreateButton ] = useState(true);

        const changeTypeHandler = (e)=>{
            let w = e.currentTarget.value;
            setWebhook(w);
        }

        useEffect(() => {
            console.log(webhook);
         }, [webhook]);

        const createNotifierHandler = ()=>{
            API.createNotifier(props.agent, props.service, receiver, parseInt(webhook))
            .then(response=>{
                if(response.status >=200 &response.status<300){
                    setDisplayCreateButton(false);
                }
            }).catch(e=>{console.log(e)});
        }

        const deleteNotifierCreatedHandler = ()=>{
            API.deleteNotifier(props.agent, props.service, receiver)
            .then(response=>{
                if(response.status >=200 & response.status<300){
                    props.deleteClick(props.index);
                }
            });
            
        }

        const createButton = <p 
        className="gadget-btn webhook-setting-btn setting-accept-btn"
        onClick={createNotifierHandler}
        >&#10003;</p>

        const removeNewItem = <p 
        className="gadget-btn webhook-setting-btn setting-delete-btn"
        onClick={deleteNotifierCreatedHandler}
        >x</p>

        const deletedCreatedItem = <p 
        className="gadget-btn webhook-setting-btn setting-delete-btn"
        onClick={()=>{props.deleteClick(props.index)}}
        >x</p>

    return (
        <div className="webhook-item">
            <select
            className="webhook-type"
            onChange={changeTypeHandler}
            value={webhook}>
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
                {displayCreateButton? createButton:null}
                {removeNewItem}
        </div>
    )
};
export default NewWebhookItem;