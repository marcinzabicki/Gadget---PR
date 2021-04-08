import React, { useState, useEffect, useContext } from "react";
import MachineTile from "./MachineTile/MachineTile";
import MachineTileMobile from "./MachineTile/MachineTileMobile";
import "../Common/MetricsComponents/MachineDetails.css";
import { API } from "../../utils/API";
import { SignalRContext } from "../../utils/signalr-context";
import { useWindowSize } from "../../Hooks";
import Modal from 'react-modal';
import LoginModal from '../Common/Modals/LoginModal';
import DashboardTable from '../Common/Tables/DashboardTable'
import EventPushModal from '../Common/Modals/EventPushModal'
import ResponseParser from '../../utils/ResponseParser';
import Helpers from '../../utils/Helpers'
import InMemoryJwt from '../../utils/Authentication/InMemoryJwt'


const Home = () => {
  const [machineList, setMachineList] = useState({});
  const connection = useContext(SignalRContext);
  const windowSize = useWindowSize();
  const [loginStatus, setLoginStatus] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [serviceEvents, setServiceEvents] = useState([]);

  const showModalLoginHandler = () => {
    let isShowing = showLoginModal;
    setShowLoginModal(!isShowing);
  };

  useEffect(()=>{
    setLoginStatus(InMemoryJwt.getTokenRefreshed()!=null);
  },[loginStatus]);


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
      API.fetchLastEvents(10).then((response) => {
        const td = [];
        response?.data.map((e, i)=>{
          td.push({agent:e.agent,service:e.service,time:Helpers.formatDate(e.createdAt), status:e.status});
        })
        setServiceEvents(td);
      });
      connection.on("MachineHealthReceived", (response) => {
        if (receivedInitialAPIdata)
          setMachineList((prevState) => {
            return {
              ...prevState,
              [response.agent]: ResponseParser.MachineHealtStatusReceived(response),
            };
          });
      });
      connection.on("ServiceStatusChanged", (response) => {
        let newRecord = {agent:response.agent, service:response.name, time:Helpers.formatDate(Date.now()), status:response.status}
        setServiceEvents(prev=>[...prev, newRecord]);
        setShowEventModal(true);
      });
      init();
    }

    return () => {
      connection?.off("MachineHealthReceived");
      connection?.off("ServiceStatusChanged");
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
  
  if (!loginStatus) {
    Modal.defaultStyles.overlay.backgroundColor = '#2B3139';
    return <LoginModal decline={showModalLoginHandler}/>
  }
  return (
    <div className="home-container">
      <div className="machine-tiles-container">{getMachines()}</div>
      <DashboardTable tableData={serviceEvents}/>
        <EventPushModal 
          isOpen={showEventModal} 
          event={serviceEvents[serviceEvents.length-1]}
          closeAction = {setShowEventModal}
          isOpen={showEventModal}
        />
    </div>
  );
};

export default Home;
