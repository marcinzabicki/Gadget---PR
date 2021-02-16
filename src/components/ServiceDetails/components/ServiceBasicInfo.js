import React, { useState, useEffect, useContext } from "react";
import Helpers from '../../../utils/Helpers';
//import { API } from "../../utils/API";

     //     const useEffect(() =>{
    //         let tmp = 0;
    //     },[]);
    
    const ServiceBasicInfo = (props)=>{
   
        

        const label =
        Object.keys(props.serviceInfo).map((k, i) => {
            return (
                <div className="service-info-row" key={`key-${i}`}>
                    <div className="service-info-key">
                        {`${Helpers.unCamel(k)}:`}
                    </div>
                    <div className="service-info-value" key={`value-${i}`}>
                        {props.serviceInfo[k]}
                    </div>
                </div>
        )});



        return (
        <div className="service-basic-info tile">     
            {label}
        </div>
    )};

export default ServiceBasicInfo;