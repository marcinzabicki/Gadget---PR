const ServiceMobile = ({ service, index }) => {
    return (
        <div key={service.name + index} className="service-mobile">
            <div className={`service-status-mobile ${service.status}`}>
            </div>
            <div className="buttons-wrapper-mobile">
                <p className="service-name-mobile">{service.name}</p>
                <div>
                    <button className="button">Stop</button>
                    <button className="button">Restart</button>
                    <button className="button special">Show logs</button>
                </div>
            </div>
        </div>
    )
}

export default ServiceMobile;