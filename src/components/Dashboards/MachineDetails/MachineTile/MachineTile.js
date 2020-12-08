import React, {useState} from 'react'
import Chart from '../Chart'
import MetricTile from '../MetricTile'
import Label from '../Label'
import '../MachineDetails.css'
import { Link } from 'react-router-dom'




const MachineTile = (props) => {

    const [machineTileState, setMachineTileState] = useState({
        metrics: {"RAM":props.ram, "CPU": props.cpu},
        show:"CPU"
    })
    
    const changeMetricData = (event) => {
        setMachineTileState({
        metrics: {"RAM":props.ram, "CPU": props.cpu},
        show: event.target.value
        })
    }
    return (
        <div className="machine-tile">
            <Link to={`/${props.machine}`}>
                <Label machineName={props.machine} machineAddress={props.address}></Label>
            </Link>
            <div className="metric-tile-container">
                <MetricTile values={props.services} type="service">Services</MetricTile>
                <MetricTile values={props.disc} type="disc">Disc space</MetricTile>
            </div>
            <Chart 
                changed={(event) => changeMetricData(event)} 
                selectable={true}>
                {parseInt(machineTileState.metrics[machineTileState.show])}
            </Chart>
        </div>

    )
}

export default MachineTile;