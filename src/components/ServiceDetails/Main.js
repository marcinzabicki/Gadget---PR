import React, { useState, useEffect, useContext } from "react";
import { SignalRContext } from "../../utils/signalr-context";
import { useWindowSize } from "../../Hooks";
import { useParams } from "react-router-dom";
import MachineBar from "../Dashboards/MachineDetails/MachineBar/MachineBar"
import NotificationCharts from "./components/NotificationsChart";
import ServiceEventsTable from "./components/ServiceEventsTable";
import ServiceBasicInfo from "./components/ServiceBasicInfo"
import NotificationSettings from "./components/NotificationsSettings"
import './components/ServiceDetails.css';
import { API } from "../../utils/API";




const ServiceDetails = ()=>{

  const connection = useContext(SignalRContext);
  const { machineName, serviceName } = useParams();
  const [machineState, setMachineState] = useState({});
  const [machineAddress, setMachineAddress] = useState("");

  
  
  const service = {
    serviceName:serviceName,
    machineName:machineName, 
    LogonAs:"Lucjano", 
    description: "Usługa do karmienia piesełów", 
    status: "Running"};


    useEffect(() => {
      const init = async () => {
        if (connection !== null) {
          await Promise.all([
            // API.fetchServicesList(machineName).then((response) => {
            //   setServices(response.data);
            // }),
            API.fetchMachineList().then((response) => {
              let ipAddress = response.data.filter(
                (ms) => ms.name == machineName
              )[0];
              setMachineAddress(ipAddress.address);
            }),
          ]);
          connection.on("MachineHealthReceived", (response) => {
            if (response.agent === machineName) {
              let updated = {};
              updated.cpu = response.cpuPercentUsage;
              updated.ram = Math.floor(
                100 * (1 - response.memoryFree / response.memoryTotal)
              );
              updated.disc = `${Math.floor(response.discOccupied)}/${Math.floor(
                response.discTotal
              )}`;
              updated.services = `${response.servicesRunning}/${response.servicesCount}`;
              setMachineState(updated);
            }
          });
          // connection.on("ServiceStatusChanged", (response) => {
          //   if (response.agent === machineName) {
          //     let updated = [...services];
          //     let indexOfChangedService = updated.findIndex(
          //       (x) => x.name.toLowerCase() === response.name.toLowerCase()
          //     );
          //     updated[indexOfChangedService].status = response.status;
          //     setServices(updated);
          //   }
          // });
        }
      };
    
      init();
      return () => {
        connection?.off("MachineHealthReceived");
        connection?.off("ServiceStatusChanged");
      };
    }, [connection]);
  
return (
    <div>
        <MachineBar
          machine={machineName}
          address={machineAddress}
          cpu={machineState.cpu}
          ram={machineState.ram}
          disc={machineState.disc}
          services={machineState.services}
        ></MachineBar>
        <div className="label-settings-container">
            <div className="label-chart-container">
                <ServiceBasicInfo 
                serviceInfo={service}
                >
                </ServiceBasicInfo>
                <NotificationCharts></NotificationCharts>
            </div>
            <div>
              <NotificationSettings></NotificationSettings>
            </div>
        </div>
        <ServiceEventsTable></ServiceEventsTable>
</div>
)}

export default ServiceDetails;