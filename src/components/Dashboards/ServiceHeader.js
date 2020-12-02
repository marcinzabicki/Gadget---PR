import React from 'react';

const ServiceHeader = ({ searchTerm, setSearchTerm }) => {

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="service-header">
            <div className="service-wrapper">
                <p className="title service-name">Service name</p>
                <p className="title service-status">Status</p>
                <p className="title service-more">Logon as</p>
                <p className="title service-more">Logon as</p>
            </div>
            <div className="button-wrapper">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}

export default ServiceHeader;