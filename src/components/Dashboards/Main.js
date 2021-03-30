import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "../../Hooks";
import Modal from "react-modal";
import Pagination from "react-js-pagination";
import Service from "./Service";
import ServiceMobile from "./ServiceMobile";
import ServiceHeader from "./ServiceHeader";
import MachineBar from "../Common/MetricsComponents/MachineBar";
import "../Common/MetricsComponents/MachineDetails.css";
import { API } from "../../utils/API";
import {UserPreferencesManager} from '../../utils/UserPreferencesManager'
import { SignalRContext } from "../../utils/signalr-context";
import ServiceHeaderMobile from "./ServiceHeaderMobile";
import ResponseParser from '../../utils/ResponseParser'
import LoginModal from "../Common/Modals/LoginModal";
import EventPushModal from '../Common/Modals/EventPushModal'
import InMemoryJwt from '../../utils/Authentication/InMemoryJwt'
import Helpers from '../../utils/Helpers'
import DashboardTable from '../Common/Tables/DashboardTable'


const Dashboards = () => {
  const windowSize = useWindowSize();
  const { machineName } = useParams();
  const [machineState, setMachineState] = useState({});

  const [services, setServices] = useState([]);
  const [favouriteServices,setFavouriteServices] = useState([]);
  const [displayedServices, setDisplayedServices] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  const [connectionState] = useState("");
  const [machineAddress, setMachineAddress] = useState("");
  const connection = useContext(SignalRContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [serviceEvents, setServiceEvents] = useState([]);

  const onAfterModalOpenHandler = ()=>{
    setTimeout(function(){setShowEventModal(false)}, 5000);
  }

  useEffect(()=>{
    setLoginStatus(InMemoryJwt.getToken()!=null);
  });

//#region fetch data effects
useEffect(() => {
  const init = async () => {
    await Promise.all([
      API.fetchServicesList(machineName).then((response) => {
        setServices(response?.data);
      }),
      API.fetchMachineList().then((response) => {
        let ipAddress = response?.data.filter(
          (ms) => ms.name === machineName
        )[0];
        setMachineAddress(ipAddress?.address);
      }),
      API.fetchLastEvents(10).then((response) => {
        const td = [];
        response?.data.map((e, i)=>{
          td.push({agent:e.agent,service:e.service,time:Helpers.formatDate(e.createdAt), status:e.status});
        })
        setServiceEvents(td);
      })
    ]);
  };
  init();
}, [machineName]);

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
          let updated = [...services];
          let indexOfChangedService = updated.findIndex(
            (x) => x.name.toLowerCase() === response.name.toLowerCase()
          );
          updated[indexOfChangedService].status = response.status;
          setServices(updated);
        }
        let newRecord = {agent:response.agent, service:response.name, time:Helpers.formatDate(Date.now()), status:response.status}
        setServiceEvents(prev=>[...prev, newRecord]);
        setShowEventModal(true);
      });
    }
  };

  init();
  return () => {
    connection?.off("MachineHealthReceived");
    connection?.off("ServiceStatusChanged");
  };
}, [connection, services, machineName]);

useEffect(()=>{
  let favourites = UserPreferencesManager.getFavouritesByAgent(machineName, services);
  setFavouriteServices(favourites);
 
}, [services]);

useEffect(()=>{
  showFavourites? setDisplayedServices(favouriteServices) : setDisplayedServices(services);
}, [services, showFavourites])


//#endregion

//#region search and pagination services
const servicesPerPage = 10;
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  Modal.defaultStyles.overlay.backgroundColor = "#2B3139";
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    let isShowing = showModal;
    setShowModal(!isShowing);
  };

  // search bar

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
 
  useEffect(() => {
      const results = displayedServices?.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(results);
  }, [searchTerm, services, displayedServices]);

  const indexOfLastService = activePage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = searchResults.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const moreResults = searchResults.length > servicesPerPage;



//#endregion
 

  if (!loginStatus) {
    return <LoginModal decline={showModalHandler}></LoginModal>;
  }


  if (windowSize <= 768) {
    return (
      <>
        <div>
          <ServiceHeaderMobile
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            setActivePage={setActivePage}
            showFavourites={showFavourites}
            setShowFavourites={setShowFavourites}
          />
          {currentServices && currentServices.length > 0 ? (
            currentServices.map((service, index) => {
              return (
                //tutaj zamienilem hubConnection na connection ale takie przekazywanie polaczenia przez propsy nie jest potrzebne, teraz mozna uzywac useContext w komponentach
                <ServiceMobile
                  key={index}
                  service={service}
                  index={index}
                  agent={machineName}
                  connection={connection}
                  connectionState={connectionState}
                />
              );
            })
          ) : (
            <p className="warning-text">No services detected</p>
          )}

          {moreResults && (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={servicesPerPage}
              totalItemsCount={searchResults.length}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              prevPageText="<"
              nextPageText=">"
              firstPageText=".."
              lastPageText=".."
            />
          )}
        </div>
      </>
    );
  }

  return (
    <div>
      <div>
        <MachineBar
          machine={machineName}
          address={machineAddress}
          cpu={machineState.cpu}
          ram={machineState.ram}
          disc={machineState.disc}
          services={machineState.services}
        ></MachineBar>
      </div>
      <ServiceHeader
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setActivePage={setActivePage}
        showFavourites={showFavourites}
        setShowFavourites={setShowFavourites}
      />

      {currentServices && currentServices.length > 0 ? (
        currentServices.map((service, index) => {
          return (
            <Service
              key={index}
              service={service}
              index={index}
              agent={machineName}
            />
          );
        })
      ) : (
        <p className="warning-text">No services detected</p>
      )}

      {moreResults && (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={servicesPerPage}
          totalItemsCount={searchResults.length}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          prevPageText="<"
          nextPageText=">"
          firstPageText=".."
          lastPageText=".."
        />
      )}
      <Modal 
        isOpen={showEventModal} 
        overlayClassName="event-modal-overlay"
        closeTimeoutMS={2000}
        onAfterOpen={onAfterModalOpenHandler}
        style={{
          overlay:{
            backgroundColor: 'rgba(0,100,0,0)',
            inset:"60vh 75vw", 
            position:'fixed',
          }, 
          content:{
                  border:"0px",
                  background:'rgba(0,0,100,0)',
                  height:200,
                  width:400
                  }}}
      >
        <EventPushModal event={serviceEvents[serviceEvents.length-1]} />
      </Modal>
      <DashboardTable tableData={serviceEvents}/>
    </div>
  );
};

export default Dashboards;
