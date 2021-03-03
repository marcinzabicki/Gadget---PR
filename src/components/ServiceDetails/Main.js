import React, { useState, useEffect, useContext } from "react";
import { SignalRContext } from "../../utils/signalr-context";
import { useWindowSize } from "../../Hooks";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import MachineBar from "../Common/MetricsComponents/MachineBar"
import NotificationCharts from "./components/NotificationsChart";
import DashboardTable from "../Common/Tables/DashboardTable";
import ServiceBasicInfo from "./components/ServiceBasicInfo"
import NotificationSettings from "./components/NotificationsSettings"
import ManageServiceTile from './components/ManageServiceTile'
import './components/ServiceDetails.css';
import { API } from "../../utils/API";
import Helpers from "../../utils/Helpers"
import ResponseParser from '../../utils/ResponseParser'

const ServiceDetails = ()=>{

  const connection = useContext(SignalRContext);
  const { machineName, serviceName } = useParams();
  const [machineState, setMachineState] = useState({});
  const [machineAddress, setMachineAddress] = useState("");
  const [serviceStatus, setServiceStatus] = useState({});
  const [serviceEvents, setServiceEvents] = useState([]);
  const [chartData, setChartDat] = useState([]);
  const [notifierTypes, setNotifierTypes] = useState([]);
  const [notifiers, setNotifiers] = useState([]);
  const windowSize = useWindowSize();
  
  

    useEffect(() => {
      const init = async () => {
          await Promise.all([
            API.fetchServiceEvents(machineName, serviceName).then((response) => {
              const cd =[];
              const td = [];
              response?.data.map((e, i)=>{
                let val = 0;
                e.status.toLowerCase(e.status) === 'running' ? val = 1 : val = 0.3
                cd.push({time:Helpers.formatDate(e.createdAt), value:val});
                td.push({agent:e.agent,time:Helpers.formatDate(e.createdAt), status:e.status});
              })
              setChartDat(cd);
              setServiceEvents(td);
            }),
            API.fetchMachineList().then((response) => {
              let ipAddress = response?.data.filter(
                (ms) => ms.name == machineName
              )[0];
              setMachineAddress(ipAddress?.address);
            }),
            API.fetchServicesList(machineName).then((response) => {
              let service = response.data.filter(x=>{ return x.name === serviceName})[0];
              console.log(service);
              let newServiceState = {
                machineName:machineName,
                serviceName:serviceName,
                logonAs:service.logOnAs,
                description:service.description,
                status:service.status
              };
              setServiceStatus(newServiceState);
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

   
    useEffect(() => {
      const init = async () => {
        if (connection !== null) {
          connection.on("MachineHealthReceived", (response) => {
            if (response?.agent === machineName) {
              let updated = ResponseParser.MachineHealtStatusReceived(response);
              setMachineState(updated);
            }
          });
          connection.on("ServiceStatusChanged", (response) => {
            if (response?.agent === machineName) {
              let update = Object.assign({}, serviceStatus);
              update.status = response.status;
              setServiceStatus(update);
            }
          });
        }
      };
  
      init();
      return () => {
        connection?.off("MachineHealthReceived");
        connection?.off("ServiceStatusChanged");
      };
    }, [connection, machineName]);

  
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
                <ServiceBasicInfo serviceInfo={serviceStatus}></ServiceBasicInfo>
                <ManageServiceTile
                agent={machineName}
                serviceName={serviceName}
                status={serviceStatus.status}>
                </ManageServiceTile>
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
          
          <DashboardTable tableData={serviceEvents} ></DashboardTable>
          <DatePicker selected={new Date("2021-02-19")} onChange={date => console.log(date)} />
</div>    
  )
}

export default ServiceDetails;