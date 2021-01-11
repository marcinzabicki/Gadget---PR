import {API} from '../../utils/API'

const ServiceMobile = ({ service, index }) => {
    return (
        <div key={service.name + index} className="service-mobile">
            <div className={`service-status-mobile ${service.status}`}>
            </div>
            <div className="buttons-wrapper-mobile">
                <p className="service-name-mobile">{service.name}</p>
                <div>
                {service.status.toLowerCase()==="running" ? (
                        <button className="button" onClick={()=>API.stopService(service.id)} >Stop</button>
                ) : (
                    <button className="button" onClick={()=>API.startService(service.id)} >Start</button>
                ) }
                
                <button className="button" onClick={()=>API.startService(service.id)} >Restart</button>
                <button className="button special">Show logs</button>
                </div>
            </div>
        </div>
    )
}

export default ServiceMobile;