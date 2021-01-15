import React, { useState, useEffect, useContext } from "react";
import Pagination from "react-js-pagination";
import Service from "./Service";
import ServiceMobile from "./ServiceMobile";
import ServiceHeader from "./ServiceHeader";
import MachineBar from "./MachineDetails/MachineBar/MachineBar";
import "../Dashboards/MachineDetails/MachineDetails.css";
import { useParams } from "react-router-dom";
import { useWindowSize } from "../../Hooks";
import { API } from "../../utils/API";
import { SignalRContext } from '../../utils/signalr-context'

const Dashboards = () => {
  const windowSize = useWindowSize();
  const { machineName } = useParams();
  const [machineState, setMachineState] = useState([]);
  const [services, setServices] = useState([]);
  const [connectionState, setConnectionState] = useState("");
  const [machineAddress, setMachineAddress] = useState("");
  const [sortBy, setSortBy] = useState("");
  const connection = useContext(SignalRContext);

  useEffect(() => {
    API.fetchServicesList(machineName).then((response) => {
      setServices(response.data);
    });
  }, []);



  useEffect(() => {
    if (connection !== null) {
      connection.on("MachineHealthRecived", (response) => {
        if (response.agent === machineName) {
          let updated = {};
          updated.cpu = response.cpuPercentUsage;
          updated.ram = Math.floor(100 * (1 - (response.memoryFree / response.memoryTotal)));
          updated.disc = `${Math.floor(response.discOccupied)}/${Math.floor(response.discTotal)}`;
          updated.services = `${response.servicesRunning}/${response.servicesCount}`;
          setMachineState(updated);
        }
      });
    }
  }, [connection]);

  useEffect(() => {
    if (connection !== null && services.length > 0) {
      connection.on("ServiceStatusChanged", (response) => {
        if (response.agent === machineName) {
          let updated = [...services];
          let indexOfChangedService = updated.findIndex(x => x.name.toLowerCase() === response.name.toLowerCase());
          updated[indexOfChangedService].status = response.status;
          setServices(updated);
        }
      });
    }
  }, [connection, services]);


  useEffect(() => {
    API.fetchMachineList().then((response) => {
      let ipAddress = response.data.filter((ms) => ms.name == machineName)[0];
      setMachineAddress(ipAddress.address);
    });
  }, []);




  const servicesPerPage = 10;
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // sorting
  const handleSortingBy = (sortBy) => {
    setSortBy(sortBy);
  }

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
  if (windowSize <= 768) {
    return (
      <>
        <div>
          {/* <div>
            <MachineBar machine="nmv3" address="127.0.01" cpu={30} ram={20} disc="47/210" services="23/98"></MachineBar>

          </div> */}
          {/* <ServiceHeader setSearchTerm={setSearchTerm} searchTerm={searchTerm} setActivePage={setActivePage} /> */}

          {currentServices && currentServices.length > 0 ? (
            currentServices.map((service, index) => {
              return (
                //tutaj zamienilem hubConnection na connection ale takie przekazywanie polaczenia przez propsy nie jest potrzebne, teraz mozna uzywac useContext w komponentach
                <ServiceMobile key={index} service={service} index={index} machineName={machineName} connection={connection} connectionState={connectionState} />
              )
            })
          ) : (
              <p className="warning-text">No services detected</p>
            )}

          {moreResults && <Pagination
            activePage={activePage}
            itemsCountPerPage={servicesPerPage}
            totalItemsCount={searchResults.length}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            prevPageText="<"
            nextPageText=">"
            firstPageText=".."
            lastPageText=".."
          />}
        </div>
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
          return <Service key={index} service={service} index={index} agent={machineName} />;
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
  );
};

export default Dashboards;
