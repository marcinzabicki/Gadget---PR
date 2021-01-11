import {API} from '../../utils/API'


const Service = ({ service, index, props }) => {
    return (
        <div key={service.name + index} className="service">
            <div className="service-wrapper">
                <p className="text service-name">{service.name}</p>
                <div className={`service-status ${service.status}`}>
                    <p>{service.status}</p>
                </div>
                <p className="text service-more">{service.logOnAs}</p>
                <p className="text service-more">{service.description}</p>
            </div>
            <div className="button-wrapper">
                {service.status.toLowerCase()==="running" ? (
                        <button className="button" onClick={()=>API.stopService(service.name)} >Stop</button>
                ) : (
                    <button className="button" onClick={()=>API.startService(service.name)} >Start</button>
                ) }
                
                <button className="button" onClick={()=>API.startService(service.id)} >Restart</button>
                <button className="button special">Show logs</button>
            </div>
        </div>
    )
}

export default Service;