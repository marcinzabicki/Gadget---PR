import React, {useEffect, useState} from 'react'
import Chart from '../Chart'
import MetricTile from '../MetricTile'
import Label from '../Label'
import '../MachineDetails.css'
import { Link } from 'react-router-dom'
import deadIcon from '../images/agent_is_dead.png'


const MachineTile = (props) => {

    const [machineTileState, setMachineTileState] = useState({
        metrics: {"RAM":props.ram, "CPU": props.cpu},
        show:"CPU",
    })

    const [refresher, setRefresher] = useState(true);
    const [timer, setTimer] =useState(setTimeout(Date.now()));

    useEffect(()=>{
        setMachineTileState({
            metrics: {"RAM":props.ram, "CPU": props.cpu},
            show:machineTileState.show
        });
        let now = Date.now();
        setTimer(now);
        return function cleanup() {
            now = null;
        }
    },[props]);

    useEffect(()=>{
       let ref =  setTimeout(function(){
            setRefresher(!refresher);
        }, 8000);
        return function cleanup() {
            ref = null;
        }
    }, [refresher])

    
    const changeMetricData = (event) => {
        setMachineTileState({
        metrics: {"RAM":props.ram, "CPU": props.cpu},
        show: event.target.value
        })
    }

    if(props.cpu>0 && ((Date.now() - timer<10000))){
        return (
            <div className="machine-tile">
        <Link to={`/${props.machine}`}>
            <Label machineName={props.machine} machineAddress={props.machineAddress}></Label>
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
    return (
        
        <div className="machine-tile">
        <Label machineName={props.machine} machineAddress={props.machineAddress}></Label>
        <div className="dead-machine-tile">
            <img src={deadIcon} height={150}/>
        </div>
        </div>
    )
}

export default MachineTile;