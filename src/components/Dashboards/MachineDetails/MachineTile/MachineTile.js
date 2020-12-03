import React from 'react'
import Chart from '../Chart'
import MetricTile from '../MetricTile'
import '../MachineDetails.css'
import Label from '../Label'

const machine = (props)=>{
    return (
        <div className="MachineTile">
            <Label machineName={props.machine} machineAddress={props.address}></Label>
            <div className="metric-tile-container">
            <MetricTile values= {props.services} type="service">Services</MetricTile>
            <MetricTile values = {props.disc} type="disc">Disc space</MetricTile>
            </div>
            <Chart selectable={true}>{props.cpu}</Chart>
        </div>
    )
}

export default machine;