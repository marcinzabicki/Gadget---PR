import React from 'react'
import discIcon from './images/hard_disc.png';
import serviceIcon from './images/service.png';
import './MachineDetails.css'

const MetricTile = (props)=>{
    const icons = {
        "service":serviceIcon,
        "disc":discIcon
    }
    return (
        <div className="metric-tile">
                <span className="metric-name">{props.children}</span>
                <div className="icon-metric">
                    <img width={22} src ={icons[props.type]}/>
                    <span>{props.values}</span>
                </div>
        </div>
    )
}

export default MetricTile;