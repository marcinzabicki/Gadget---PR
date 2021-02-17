import React, { useState, useEffect, useContext } from "react";
import Switch from "react-switch";
import Helpers from '../../../utils/Helpers';
//import {API}  from "../../../utils/API";


    
    const NotificationSettings = (props)=>{


        return (<div className="level-item" key={i}>

            <input type="checkbox" id={`level-${l["name"]}`} checked={l["checked"]} onChange={()=>{console.log("dfdf")}} />
            <label >{l["name"]}</label>
        </div>)
    });

    const sinks = data["sinks"].map((s, i) => {
        return (
            <div className="notifications-sink-settings" key={i}>
                <h1>{Helpers.upperFirst(s["name"])}</h1>
                <Switch
                    onChange={() => { console.log("dfdf") }}
                    checked={s["checked"]}
                    offColor="#707070"
                    onColor="#38E18D"
                    width={52}
                    height={19}
                    handleDiameter={16}
                />
                <div className="notifications-sink-parameters">
                    {
                        s.settings.map((p, j) => {
                            return (
                                <div key={j}>
                                    <input className="sink-input" placeholder={p["name"]} type="text" id={`sink-param-${p["name"]}`} value={s["value"]}></input>
                                </div>
                            )
                        })
                    }</div>
            </div>
        )
    })

    return (
        <div className="notifications-settings tile">
            <h1>Send Notifications</h1>
            <div className="notifications-levels">
                {levels}
            </div>
            {sinks}
            <div class="apply-btn-wrapper">
                <button className="apply-btn">Apply</button>
            </div>
        </div>
    )
}

export default NotificationSettings;