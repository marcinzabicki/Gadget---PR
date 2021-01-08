import React, { useState, useEffect, useContext } from 'react'
import MachineTile from '../Dashboards/MachineDetails/MachineTile/MachineTile'
import '../Dashboards/MachineDetails/MachineDetails.css';
//import Logs from '../Dashboards/Logs/Logs'
import { API } from '../../utils/API'
import { SignalRContext } from '../../utils/signalr-context';
const Home = () => {

    const connection = useContext(SignalRContext);
    
    const [machineListState, setMachineListState] = useState({
        machines: [],
        hubConnection: null
    })

    useEffect(() => {
        API.fetchMachineList().then((response) => {
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
        if (machineListState.hubConnection !== null) {
            machineListState.hubConnection.on("MachineHealthRecived", (response) => {
                console.log(response);
                let updated = [...machineListState.machines];
                let index = updated.findIndex(x=>x.name==response.agent)
               
                updated[index].cpu = response.cpuPercentUsage;
                updated[index].ram = 100*(1-(response.memoryFree/response.memoryTotal));
                updated[index].disc = `${Math.floor(response.discOccupied)}/${Math.floor(response.discTotal)}`;
                updated[index].services = `${response.servicesRunning}/${response.servicesCount}`
                setMachineListState({
                    machines: updated,
                    hubConnection : machineListState.hubConnection
                })
          });
        }
    }, [machineListState.hubConnection]);

    const machines = machineListState.machines.map((m, i) => {
        return (
            <MachineTile 
            machine = {m["name"]} 
            cpu={m["cpu"]}  
            ram={m["ram"]} 
            disc={m["disc"]} 
            services={m["services"]} 
            key={i}
            machineAddress={m["address"]}>
            </MachineTile>
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
            {machines}
        </div>
            {/* <Logs>{tmpLogs}</Logs> */}
        </div>
    );
}

export default Home;
