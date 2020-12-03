import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { services } from "../../utils/data";
import Service from './Service';
import ServiceHeader from './ServiceHeader';

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
