import React from 'react';
import Chart from './Chart/Chart'
import MetricTile from './MetricTile'
import Label from './Label/Label'

const machineBar = (props) =>{

    const machinesStyle = {
        display: "flex",
        "background-color": "#313843",
        "border-radius": "3px",
        "width": "1358px",
        "height": "157px"
     }
    return  (
        <div style={machinesStyle} clasName="MachineBar">
             <Label machineName={props.machine} machineAddress={props.address}></Label>
            <Chart selectable={false}>{props.cpu}</Chart>
            <Chart selectable={false}>{props.ram}</Chart>
            <MetricTile values= {props.services} type="service">Services</MetricTile>
            <MetricTile values = {props.disc} type="disc">Disc space</MetricTile>
        </div>
    )
}

export default machineBar;