import React, { useState, useEffect, useContext } from "react";
//import { API } from "../../utils/API";
import { SignalRContext } from "../../utils/signalr-context";
import { useWindowSize } from "../../Hooks";
import MachineBar from "../Dashboards/MachineDetails/MachineBar/MachineBar"
import NotificationCharts from "./components/NotificationsChart";
import ServiceEventsTable from "./components/ServiceEventsTable";
import ServiceBasicInfo from "./components/ServiceBasicInfo"
import NotificationSettings from "./components/NotificationsSettings"
import './components/ServiceDetails.css';


const ServiceDetails = ()=>{
  const x = {cpu:31, ram :45, disc :"45/345", services : "13/34"}
  const machineName = "Lucek"
  const machineAddress = "Kobielska"
return (
    <div>
        <MachineBar
          machine={machineName}
          address={machineAddress}
          cpu={x.cpu}
          ram={x.ram}
          disc={x.disc}
          services={x.services}
        ></MachineBar>
        <div className="label-settings-container">
            <div className="label-chart-container">
                <ServiceBasicInfo></ServiceBasicInfo>
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