import React, {useState, useEffect} from 'react'
import MachineTile from '../Dashboards/MachineDetails/MachineTile/MachineTile'
import '../Dashboards/MachineDetails/MachineDetails.css';
//import Logs from '../Dashboards/Logs/Logs'
import {API} from '../../utils/API'
import { HubConnection } from 'signalr-client-react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Home = () => {

    const [machineListState, setMachineListState] = useState({
        machines: [],
        hubConnection:null
    })

     useEffect(() => {
        API.fetchMachineList().then((response) => {
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:5001/gadget')
                .configureLogging(LogLevel.Critical)
                .withAutomaticReconnect()
                .build();

            connection.start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));

            setMachineListState({
                machines: response.data,
                hubConnection:connection
            });
        });
    }, []);

    const machines = machineListState.machines.map((m, i) => {
        return (
            <MachineTile machine = {m["agent"]} key={i}></MachineTile>
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
