const Service = ({ service, index }) => {
    return (
        <div key={service.name + index} className="service">
            <div className="service-wrapper">
                <p className="text service-name">{service.name}</p>
                <div className={`service-status ${service.status}`}>
                    <p>{service.status}</p>
                </div>
                <p className="text service-more">Portal services</p>
                <p className="text service-more">Lorem ipsum sd</p>
            </div>
            <div className="button-wrapper">
                <button className="button">Stop</button>
                <button className="button">Restart</button>
                <button className="button special">Show logs</button>
            </div>
        </div>
    )
}

export default Service;