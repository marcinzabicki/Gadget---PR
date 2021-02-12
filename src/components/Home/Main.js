import React, { useState, useEffect, useContext } from "react";
import MachineTile from "../Dashboards/MachineDetails/MachineTile/MachineTile";
import MachineTileMobile from "../Dashboards/MachineDetails/MachineTile/MachineTileMobile";
import "../Dashboards/MachineDetails/MachineDetails.css";
import Logs from "../Dashboards/Logs/Logs";
import { API } from "../../utils/API";
import { SignalRContext } from "../../utils/signalr-context";
import { useWindowSize } from "../../Hooks";
import ServiceDetails from "../ServiceDetails/Main";



const Home = () => {
  const [machineList, setMachineList] = useState({});
  const connection = useContext(SignalRContext);
  const windowSize = useWindowSize();

  function calculateMachineStatus(machine) {
    if (
      machine.cpu > 0.7 ||
      machine.ram > 0.75 ||
      machine.discPercentage > 0.95
    )
      return "#E13849";
    if (machine.cpu > 0.6 || machine.ram > 0.6 || machine.discPercentage > 0.7)
      return "#F0AD4E";
    if (machine.cpu > 0 || machine.ram > 0 || machine.discPercentage > 0)
      return "#38E18D";
    return "#4B4E75";
  }

  useEffect(() => {
    let receivedInitialAPIdata = false;
    if (connection !== null) {
      const init = async () => {
        const response = await API.fetchMachineList();
        let machines = {};
        response.data.map((machine) => {
          return (machines[machine.name] = machine);
        });
        setMachineList(machines);
        receivedInitialAPIdata = true;
      };
      connection.on("MachineHealthReceived", (response) => {
        if (receivedInitialAPIdata)
          setMachineList((prevState) => {
            return {
              ...prevState,
              [response.agent]: {
                name: response.agent,
                cpu: response.cpuPercentUsage,
                ram: 100 * (1 - response.memoryFree / response.memoryTotal),
                disc: `${Math.floor(response.discOccupied)}/${Math.floor(
                  response.discTotal
                )}`,
                services: `${response.servicesRunning}/${response.servicesCount}`,
              },
            };
          });
      });
      init();
    }

    return () => {
      connection?.off("MachineHealthReceived");
    };
  }, [connection]);

  const getMachines = () => {
    if (windowSize <= 768) {
      return Object.keys(machineList).map((m, i) => {
        return (
          <MachineTileMobile
            machine={machineList[m].name}
            key={i}
            order={i + 1}
            color={calculateMachineStatus(machineList[m])}
            machineAddress={machineList[m].address}
          ></MachineTileMobile>
        );
      });
    }
    return Object.keys(machineList).map((m, i) => {
      return (
        <MachineTile
          machine={machineList[m].name}
          cpu={machineList[m].cpu}
          ram={machineList[m].ram}
          disc={machineList[m].disc}
          services={machineList[m].services}
          key={i}
          machineAddress={machineList[m].address}
        ></MachineTile>
      );
    });
  };

  return (
    <div className="home-container">
      <div className="machine-tiles-container">{getMachines()}</div>
      <Logs></Logs>
      <ServiceDetails></ServiceDetails>
    </div>
  );
};

export default Home;
