import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { services } from "../../utils/data";
import Service from './Service';
import ServiceHeader from './ServiceHeader';
import MachineBar from './MachineDetails/MachineBar/MachineBar'
import '../Dashboards/MachineDetails/MachineDetails.css'

const Dashboards = () => {
    // const [machines, setMachines] = useState();

    // useEffect(() => {
    //     API.fetchMachineList().then((response) => {
    //         setMachines(response.data);
    //     });
    // }, []);


    // pagination

    const servicesPerPage = 5;
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
    };

    // search bar

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = services.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm]);

    const indexOfLastService = activePage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = searchResults.slice(indexOfFirstService, indexOfLastService);
    const moreResults = searchResults.length > servicesPerPage;

    return (
        <div>
            <div>
            <MachineBar machine="nmv3" address="127.0.01" cpu={30} ram={20} disc="47/210" services="23/98"></MachineBar>

            </div>
            <ServiceHeader setSearchTerm={setSearchTerm} searchTerm={searchTerm} setActivePage={setActivePage} />

            {currentServices && currentServices.length > 0 ? (
                currentServices.map((service, index) => {
                    return (
                        <Service key={index} service={service} index={index} />
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
    );
};

export default Dashboards;
