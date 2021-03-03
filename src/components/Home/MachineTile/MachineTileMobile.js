import React from 'react';
import '../../Common/MetricsComponents/MachineDetails.css'
import { Link } from 'react-router-dom'

const MachineTileMobile = (props) => {

  
    return (
        <div className="machine-tile-mobile">
            <div className="machine-tile-mobile-order">{props.order}</div>
           <div className="machine-tile-mobile-name">
           <Link to={`/${props.machine}`}>
                <span className="label-mobile">{props.machine}</span>
            </Link>
           </div>
            <div className="machine-tile-mobile-name">
            <Link to={`/${props.machine}`}>
                <span className="label-mobile">{props.machineAddress}</span>
            </Link>
            </div>
            
            <div className="status-mobile">
                <div style={{backgroundColor:props.color}} className="status-dot"></div>
            </div>
            
        </div>
    )
}

export default MachineTileMobile;