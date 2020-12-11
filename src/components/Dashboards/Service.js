const Service = ({ service, index, hubConnection, connectionState, machineName }) => {
    console.log(service)
    const startService = (ServiceName) => {
        if (hubConnection !== null && hubConnection.state === "Connected") {
            hubConnection.invoke("StartService", {
                AgentId: machineName,
                ServiceName,
            });
        }
    };

    const stopService = (ServiceName) => {
        if (hubConnection !== null && hubConnection.state === "Connected") {
            hubConnection.invoke("StopService", {
                AgentId: machineName,
                ServiceName,
            });
        }
    };

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
                {service.status === "Running" ? (
                    <button className="button"
                        disabled={connectionState !== "Connected"}
                        onClick={() => stopService(service.name)}
                    >
                        {connectionState === "Connected" ? "Stop" : connectionState}
                    </button>
                ) : (
                        <button className="button"
                            disabled={connectionState !== "Connected"}
                            onClick={() => startService(service.name)}
                        >
                            {connectionState === "Connected"
                                ? "Start"
                                : connectionState}
                        </button>
                    )}
                <button className="button special">Show logs</button>
            </div>
        </div>
    )
}

export default Service;