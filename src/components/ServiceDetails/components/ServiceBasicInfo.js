import React, { useState, useEffect, useContext } from "react";
import Helpers from '../../../utils/Helpers';
//import { API } from "../../utils/API";

     //     const useEffect(() =>{
    //         let tmp = 0;
    //     },[]);
    
    const ServiceBasicInfo = (props)=>{
   
        const service = 
            {serviceName:"Lucek service", LogonAs:"Lucjano", description: "Usługa do karmienia piesełów", status: "Running", };

        const label =
        Object.keys(service).map((k, i) => {
            return (
                <div className="service-info-row" key={`key-${i}`}>
                    <div className="service-info-key">
                        {`${Helpers.unCamel(k)}:`}
                    </div>
                    <div className="service-info-value" key={`value-${i}`}>
                        {service[k]}
                    </div>
                </div>
        )});



        return (
        <div className="service-basic-info tile">     
            {label}
        </div>
    )};

export default ServiceBasicInfo;