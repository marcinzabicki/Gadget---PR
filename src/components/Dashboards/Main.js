import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "../../Hooks";
import Modal from "react-modal";
import Pagination from "react-js-pagination";
import Service from "./Service";
import ServiceMobile from "./ServiceMobile";
import ServiceHeader from "./ServiceHeader";
import MachineBar from "./MachineDetails/MachineBar/MachineBar";
import "../Dashboards/MachineDetails/MachineDetails.css";
import { API } from "../../utils/API";
import { SignalRContext } from "../../utils/signalr-context";
import Logs from "../Dashboards/Logs/Logs";
import ServiceHeaderMobile from "./ServiceHeaderMobile";
import LoginModal from "../LoginModal";

const Dashboards = () => {
  const windowSize = useWindowSize();
  const { machineName } = useParams();
  const [machineState, setMachineState] = useState({});
  const [services, setServices] = useState([]);
  const [connectionState, setConnectionState] = useState("");
  const [machineAddress, setMachineAddress] = useState("");
  const connection = useContext(SignalRContext);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        API.fetchServicesList(machineName).then((response) => {
          setServices(response.data);
        }),
        API.fetchMachineList().then((response) => {
          let ipAddress = response.data.filter(
            (ms) => ms.name == machineName
          )[0];
          setMachineAddress(ipAddress.address);
        }),
      ]);
    };
    init();
  }, [machineName]);

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
        connection.on("ServiceStatusChanged", (response) => {
          if (response.agent === machineName) {
            let updated = [...services];
            let indexOfChangedService = updated.findIndex(
              (x) => x.name.toLowerCase() === response.name.toLowerCase()
            );
            updated[indexOfChangedService].status = response.status;
            setServices(updated);
          }
        });
      }
    };

    init();
    return () => {
      connection?.off("MachineHealthReceived");
      connection?.off("ServiceStatusChanged");
    };
  }, [connection, services, machineName]);

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
    const results = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, services]);

  const indexOfLastService = activePage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = searchResults.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const moreResults = searchResults.length > servicesPerPage;

  API.test().then((response) => {
    if (response?.status == "200") {
      setLoginStatus(true);
    }
  });
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
      <Logs></Logs>
    </div>
  );
};

export default Dashboards;
