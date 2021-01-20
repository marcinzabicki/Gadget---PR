import React, { useState, useEffect, useContext } from 'react'
import MachineTile from '../Dashboards/MachineDetails/MachineTile/MachineTile'
import MachineTileMobile from '../Dashboards/MachineDetails/MachineTile/MachineTileMobile'
import '../Dashboards/MachineDetails/MachineDetails.css';
import Logs from '../Dashboards/Logs/Logs'
import { API } from '../../utils/API'
import { SignalRContext } from '../../utils/signalr-context';
import { useWindowSize } from "../../Hooks";


const Home = () => {
    const [machineListState, setMachineListState] = useState([])
    const connection = useContext(SignalRContext);
    const windowSize = useWindowSize();
    


    useEffect(() => {
        API.fetchMachineList().then((response) => {
            setMachineListState(response.data);
        });
    }, []);

    function calculateMachineStatus(machine) {
        if (machine.cpu > 0.7 || machine.ram > 0.75 || machine.discPercentage > 0.95) return "#E13849";
        if (machine.cpu > 0.6 || machine.ram > 0.6 || machine.discPercentage > 0.7) return "#F0AD4E";
        if (machine.cpu > 0 || machine.ram > 0 || machine.discPercentage > 0) return "#38E18D";
        return "#4B4E75"
    };

    useEffect(() => {
        let isMounted = true;
        if (connection !== null) {
            connection.on("MachineHealthRecived", (response) => { //MachineHealthReceived fix typo  MachineHealthRecived
                const updated = [...machineListState];
                const index = updated.findIndex(x => x.name == response.agent);

                updated[index].cpu = response.cpuPercentUsage;
                updated[index].ram = 100 * (1 - (response.memoryFree / response.memoryTotal));
                updated[index].disc = `${Math.floor(response.discOccupied)}/${Math.floor(response.discTotal)}`;
                updated[index].discPercentage = Math.floor(response.discOccupied / response.discTotal);
                updated[index].services = `${response.servicesRunning}/${response.servicesCount}`;
                isMounted && setMachineListState(updated);
            });
        }

        return () => { isMounted = false; connection && connection.off("MachineHealthReceived") };
    }, [connection, machineListState]);

    let machines = {};
    windowSize <= 768 ? (
        machines = machineListState.map((m, i) => {
            return (
                <MachineTileMobile
                    machine={m["name"]}
                    key={i}
                    order={i + 1}
                    color={calculateMachineStatus(m)}
                    machineAddress={m["address"]}>
                </MachineTileMobile>
            )
        })
    ) :
        (
            machines = machineListState.map((m, i) => {
                return (
                    <MachineTile
                        machine={m["name"]}
                        cpu={m["cpu"]}
                        ram={m["ram"]}
                        disc={m["disc"]}
                        services={m["services"]}
                        key={i}
                        machineAddress={m["address"]}>
                    </MachineTile>
                )
            })
        );


    return (
        <div className="home-container">
            <div className="machine-tiles-container">
                {machines}
            </div>
            {/* <Logs></Logs> */}
        </div>
    );
}

export default Home;
