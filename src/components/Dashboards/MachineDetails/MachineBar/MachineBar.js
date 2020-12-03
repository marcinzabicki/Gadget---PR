import React from 'react';
import Chart from '../Chart'
import MetricTile from '../MetricTile'
import Label from '../Label'
import '../MachineDetails.css'

const MachineBar = (props) =>{

    
    return  (
        <div className="machine-bar">
            <Label machineName={props.machine} machineAddress={props.address}></Label>
            <Chart selectable={false}>{props.cpu}</Chart>
            <Chart selectable={false}>{props.ram}</Chart>
            <MetricTile values= {props.services} type="service">Services</MetricTile>
            <MetricTile values = {props.disc} type="disc">Disc space</MetricTile>
            
        </div>
    )
}

export default MachineBar;