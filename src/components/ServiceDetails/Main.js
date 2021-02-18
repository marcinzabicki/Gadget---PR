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
import Helpers from "../../utils/Helpers"

const ServiceDetails = ()=>{

  const connection = useContext(SignalRContext);
  const { machineName, serviceName } = useParams();
  const [machineState, setMachineState] = useState({});
  const [machineAddress, setMachineAddress] = useState("");
  const [serviceEvents, setServiceEvents] = useState({});
  const [chartData, setChartDat] = useState([]);

  
  
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
            API.fetchServiceEvents(machineName, serviceName).then((response) => {
              const cd =[] 
              response.data.map((e, i)=>{
                let val = 0;
                e.status.toLowerCase(e.status) === 'running' ? val = 1 : val = 0.3
                cd.push({time:Helpers.formatDate(e.createdAt), value:val})
              })
              setChartDat(cd);
            }),
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
          services={machineState.services}>
</MachineBar>

<div className="label-settings-container">
            <div className="label-chart-container">
                <ServiceBasicInfo serviceInfo={service}></ServiceBasicInfo>
                <NotificationCharts data={chartData}></NotificationCharts>
            </div>
              <NotificationSettings></NotificationSettings>
</div> 
          
          <ServiceEventsTable></ServiceEventsTable>
</div>    
  )
}

export default ServiceDetails;