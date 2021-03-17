import React from 'react';
import Switch from "react-switch";

const ServiceHeader = ({ searchTerm, 
                        setSearchTerm, 
                        setActivePage, 
                        showFavourites, 
                        setShowFavourites }) => {

    const handleSearch = e => {
        setSearchTerm(e.target.value);
        setActivePage(1)
    };

    const showFavHandle = e=>{
        setShowFavourites(e)
    }


    return (
        <div className="service-header">
            <div className="service-wrapper">
                <p className="title service-name">Service name</p>
                <p className="title service-status">Status</p>
                <p className="title service-more">Logon as</p>
                <p className="title service-more">Description</p>
            </div>
            <div className="button-wrapper">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <p className="fav-only-label">Favourites</p>
            <Switch
                    onChange={showFavHandle}
                    checked={showFavourites}
                    offColor="#707070"
                    onColor="#38E18D"
                    width={52}
                    height={19}
                    handleDiameter={16}
                />
        </div>
    )
}

export default ServiceHeader;