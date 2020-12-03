import React from 'react'
import Chart from '../Chart'
import MetricTile from '../MetricTile'
import './MachineTile.css'
import Label from '../Label'

const machine = (props)=>{
    return (
        <div className="Machine">
            <Label machineName={props.machine} machineAddress={props.address}></Label>
            <MetricTile values= {props.services} type="service">Services</MetricTile>
            <MetricTile values = {props.disc} type="disc">Disc space</MetricTile>
            <Chart selectable={true}>{props.cpu}</Chart>
        </div>
    )
}

export default machine;