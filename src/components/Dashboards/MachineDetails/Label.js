import React from 'react';
import './MachineDetails.css'

const Label = (props) =>{

    
    return (
        <div className="label">
                <p>{props.machineName}</p>
                <p>{props.machineAddress}</p>
            </div>
    )
}

export default Label;