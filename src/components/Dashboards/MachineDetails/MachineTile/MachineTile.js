import React from 'react'
import Chart from '../Chart'
import MetricTile from '../MetricTile'
import Label from '../Label'
import '../MachineDetails.css'

const changeMetricData = (event)=>{
   console.log(event.target.value);
}

const MachineTile = (props)=>{
    return (
        <div className="machine-tile">
            <Label machineName={props.machine} machineAddress={props.address}></Label>
            <div className="metric-tile-container">
            <MetricTile values= {props.services} type="service">Services</MetricTile>
            <MetricTile values = {props.disc} type="disc">Disc space</MetricTile>
            </div>
            <Chart changed={(event)=>changeMetricData(event)} selectable={true}>{props.cpu}</Chart>
        </div>
    )
}

export default MachineTile;