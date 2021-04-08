import React from 'react';
import Switch from "react-switch";

const ServiceHeaderMobile = ({ 
    searchTerm, 
    setSearchTerm, 
    setActivePage, 
    showFavourites, 
    setShowFavourites}) => {

    const handleSearch = e => {
        setSearchTerm(e.target.value);
        setActivePage(1)
    };

    const showFavHandle = e=>{
        setShowFavourites(e)
    }

    return (
        <div className="service-header">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
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

export default ServiceHeaderMobile;