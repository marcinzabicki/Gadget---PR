import React, { useState, useEffect, useContext } from "react";
//import { API } from "../../utils/API";

     //     const useEffect(() =>{
    //         let tmp = 0;
    //     },[]);
    
    const ServiceBasicInfo = (props)=>{
   
        const service = 
            {serviceName:"Lucek service", LogonAs:"Lucjano", description: "Usługa do karmienia piesełów", status: "Running", };

        function unCamel(str){
            let result = str.replace( /([A-Z])/g, " $1" );
            return result.charAt(0).toUpperCase() + result.slice(1);
        };

        const label =
        Object.keys(service).map((k, i) => {
            return (
                <div className="service-info-row">
                    <div className="service-info-key" key={`key-${i}`}>
                        {`${unCamel(k)}:`}
                    </div>
                    <div className="service-info-value" key={`value-${i}`}>
                        {service[k]}
                    </div>
                </div>
        )});



        return (
        <div className="service-basic-info">     
            {label}
        </div>
    )};

export default ServiceBasicInfo;