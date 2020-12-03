import React from 'react';

const label = (props) =>{
    const style = {
        color:"white"
    }
    return (
        <div style={style} className="Label">
                <span>{props.machineName}</span>
                <span>{props.machineAddress}</span>
            </div>
    )
}

export default label;