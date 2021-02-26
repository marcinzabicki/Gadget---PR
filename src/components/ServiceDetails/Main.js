import React, { useState, useEffect, useContext } from "react";
import { SignalRContext } from "../../utils/signalr-context";
import { useWindowSize } from "../../Hooks";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
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
  const [serviceEvents, setServiceEvents] = useState([]);
  const [chartData, setChartDat] = useState([]);
  const [notifierTypes, setNotifierTypes] = useState([]);
  const [notifiers, setNotifiers] = useState([]);
  const windowSize = useWindowSize();
  
  const service = {
    serviceName:serviceName,
    machineName:machineName, 
    LogonAs:"Lucjano", 
    description: "Usługa do karmienia piesełów", 
    status: "Running"};


    useEffect(() => {
      const init = async () => {
        if (connection !== null) {
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
      };
    }, [connection, machineName, serviceName]);

    useEffect(() => {
      const init = async () => {
          await Promise.all([
            API.fetchServiceEvents(machineName, serviceName).then((response) => {
              const cd =[];
              const td = [];
              response.data.map((e, i)=>{
                let val = 0;
                e.status.toLowerCase(e.status) === 'running' ? val = 1 : val = 0.3
                cd.push({time:Helpers.formatDate(e.createdAt), value:val});
                td.push({agent:e.agent,time:Helpers.formatDate(e.createdAt), status:e.status});
              })
              setChartDat(cd);
              setServiceEvents(td);
            }),
            API.fetchMachineList().then((response) => {
              let ipAddress = response.data.filter(
                (ms) => ms.name == machineName
              )[0];
              setMachineAddress(ipAddress.address);
            }),
            API.getNotifierTypes().then((response) => {
              setNotifierTypes(response?.data);
            }),
            API.fetchWebhooks(machineName, serviceName).then((response) => {
              setNotifiers(response?.data.notifiers);
            })
          ]);
        };
      init();
    }, []);//[machineName, serviceName]

   


  
return (
    <div>
      {
        windowSize<=768 ? null : <MachineBar
        machine={machineName}
        address={machineAddress}
        cpu={machineState.cpu}
        ram={machineState.ram}
        disc={machineState.disc}
        services={machineState.services}>
      </MachineBar> 
      }
       
<div className="label-settings-container">
            <div className="label-chart-container">
                <ServiceBasicInfo serviceInfo={service}></ServiceBasicInfo>
                <NotificationCharts data={chartData}></NotificationCharts>
            </div>
              <NotificationSettings
              types={notifierTypes}
              notifiers={notifiers}
              agent={machineName}
              service={serviceName}
              >
              </NotificationSettings>
</div> 
          
          <ServiceEventsTable tableData={serviceEvents} ></ServiceEventsTable>
          <DatePicker selected={new Date("2021-02-19")} onChange={date => console.log(date)} />
</div>    
  )
}

export default ServiceDetails;