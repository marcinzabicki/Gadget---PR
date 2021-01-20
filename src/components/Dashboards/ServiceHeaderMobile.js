import React from 'react';

const ServiceHeaderMobile = ({ searchTerm, setSearchTerm, setActivePage }) => {

    const handleSearch = e => {
        setSearchTerm(e.target.value);
        setActivePage(1)
    };

    return (
        <div className="service-header">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
        </div>
    )
}

export default ServiceHeaderMobile;