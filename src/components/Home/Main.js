import React, { useState, useEffect } from 'react'
import MachineTile from '../Dashboards/MachineDetails/MachineTile/MachineTile'
import '../Dashboards/MachineDetails/MachineDetails.css';
//import Logs from '../Dashboards/Logs/Logs'
import { API } from '../../utils/API'
import { useSignalRConnection } from '../../utils/hooks'
import { HubConnection } from 'signalr-client-react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Home = () => {

    const [machineListState, setMachineListState] = useState({
        machines: [],
        hubConnection: null
    })

    const [machinesMetrics, setmachinesMetrics] = useState({
        metrics: [],

    })
    const connection = useSignalRConnection('https://localhost:5001/gadget')


    useEffect(() => {
        API.fetchMachineList().then((response) => {
            console.log(connection)

            setMachineListState({
                machines: response.data,
                hubConnection: connection
            });
        });
        console.log('eta maszina', machineListState.hubConnection)
        return () => {
            console.log(
                'eta maszina stop', machineListState.hubConnection)

        }
    }, []);

    useEffect(() => {
        connection?.start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
    }, [connection])

    useEffect(() => {
        if (machineListState.hubConnection !== null) {
            machineListState.hubConnection.on("MachineHealthRecived", (response) => {

            });

            const start = async () => {
                if (machineListState.hubConnection.state === "Disconnected")
                    try {
                        await machineListState.hubConnection.start();
                    } catch (err) {
                        console.log(err);
                        setTimeout(() => start(), 5000);
                    }
            };

            //   start().then(() => {
            //     machineListState.hubConnection.invoke("RegisterDashboard", {});
            //     setConnectionState("Connected");
            //   });
        }
    }, [machineListState.hubConnection]);

    const machines = machineListState.machines.map((m, i) => {
        return (
            <MachineTile machine={m["name"]} key={i}></MachineTile>
        )
    })

    // const tmpLogs = [
    //     {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"},
    //     {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"},
    //     {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"},
    //     {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"}
    //   ]
    return (
        <div>
            <div className="machine-tiles-container">
                {/* <MachineTile machine="nmv3" address="127.0.0.1" cpu={70} ram={90} disc="47/210" services="23/98"></MachineTile>
            <MachineTile machine="nmv3" address="127.0.0.1" cpu={30} ram={23} disc="150/195" services="48/66"></MachineTile>
            <MachineTile machine="nmv3" address="127.0.0.1" cpu={20} ram={90} disc="47/210" services="23/98"></MachineTile>
            <MachineTile machine="nmv3" address="127.0.0.1" cpu={65} ram={23} disc="150/195" services="48/66"></MachineTile> */}
                {machines}
            </div>
            {/* <Logs>{tmpLogs}</Logs> */}
        </div>
    );
}

export default Home;
