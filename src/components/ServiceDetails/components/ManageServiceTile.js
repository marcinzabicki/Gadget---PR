import React from "react";
import {API} from '../../../utils/API'


    
    const ManageServiceTile = (props)=>{
        const showModalHandler = ()=> {console.log("sdsfd")}
   
    return (
        <div className="tile">
           <div className="button-wrapper">
                {props.status.toLowerCase() === "running" ? (
                    <button className="button" onClick={() => API.stopService(props.agent, props.serviceName)} >Stop</button>
                ) : (
                        <button className="button" onClick={() => API.startService(props.agent, props.serviceName)} >Start</button>
                    )}
                <button className="button" onClick={showModalHandler} >Restart</button>
            </div>
        </div>
    )
};

export default ManageServiceTile;