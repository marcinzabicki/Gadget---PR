import React, { useState, useEffect, useContext } from "react";
import Switch from "react-switch";
import Helpers from '../../../utils/Helpers';
//import {API}  from "../../../utils/API";


    
    const NotificationSettings = (props)=>{
const [settings, setSettings] = useState({
    levels: [{name:"critical", checked: true},
                {name:"error", checked: false},
                {name:"warning", checked: false},
                {name:"serviceStarted", checked: false},
                {name:"ServiceStopped", checked: false}],
    sinks:  [{name:"email", checked: false, settings:[{name:"email csv", value:""}]},
            {name:"discord", checked: true, settings:[{name:"discord server", value:""},{name:"users csv", value:""}]},
            {name:"GSM", checked: false, settings:[{name:"phone number", value:""}]},
            {name:"slack", checked: false, settings:[{name:"slack server", value:""}, {name:"users csv", value:""}]}],
    });

    // settings[sinks]

    // useEffect(() => {
      
    // });

    const checkBoxHandler = (value, checkName, parent)=>{
        let updated = {...settings};
        let index = updated[parent].findIndex(x=>x.name == checkName);
        updated[parent][index].checked = !value;
        setSettings(updated);
        
    };

    const sinkSettingsHandler = (value, sinkName, settingName)=>{
       let updated = {...settings};
        // get sink index = 
        let sinkIndex = updated['sinks'].findIndex(x=>x.name == sinkName);
        let settingIndex = updated['sinks'][sinkIndex]['settings'].findIndex(x=>x.name == settingName);
        updated['sinks'][sinkIndex]['settings'][settingIndex].value = value.target.value;
        setSettings(updated);
        console.log(updated);
    }
        const levels = settings["levels"].map((l, i)=>{

            return (<div className="level-item" key={i}>
                <input type="checkbox" id={`level-${l["name"]}`} checked={l["checked"]} onChange={()=>{checkBoxHandler(l['checked'], l['name'], 'levels')}} />
                <label >{l["name"]}</label>
            </div>)
        });

    const sinks = settings["sinks"].map((s, i) => {
        return (
            <div className="notifications-sink-settings" key={i}>
                <h1>{Helpers.upperFirst(s["name"])}</h1>
                <Switch
                    onChange={() => {checkBoxHandler(s.checked, s.name, 'sinks')}}
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
                                    <input 
                                    className="sink-input"
                                    placeholder={p["name"]} 
                                    type="text" 
                                    id={`sink-param-${p["name"]}`} 
                                    value={s["value"]}
                                    onChange={(e)=>{sinkSettingsHandler(e, s["name"], p["name"])}}>
                                    </input>
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
            <div className="apply-btn-wrapper">
                <button className="apply-btn">Apply</button>
            </div>
        </div>
    )

}
export default NotificationSettings;