import React, { useState, useEffect, useContext } from "react";
import Helpers from '../../../utils/Helpers';
import Switch from "react-switch";
//import { API } from "../../utils/API";

//     const useEffect(() =>{
//         let tmp = 0;
//     },[]);

const data = {
    levels: [{ name: "critical", checked: true },
    { name: "error", checked: false },
    { name: "warning", checked: false },
    { name: "serviceStarted", checked: false },
    { name: "ServiceStopped", checked: false }],
    sinks: [{ name: "email", checked: false, settings: [{ name: "email csv", value: "" }] },
    { name: "discord", checked: true, settings: [{ name: "discord server", value: "" }, { name: "users csv", value: "" }] },
    { name: "GSM", checked: false, settings: [{ name: "phone number", value: "" }] },
    { name: "slack", checked: false, settings: [{ name: "slack server", value: "" }, { name: "users csv", value: "" }] }],
}

const NotificationSettings = (props) => {

    const levels = data["levels"].map((l, i) => {

        return (<div className="level-item" key={i}>
            <input type="checkbox" id={`level-${l["name"]}`} checked={l["checked"]} />
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