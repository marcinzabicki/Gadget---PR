import React, { useState, useEffect, useContext } from "react";
//import { API } from "../../utils/API";

     //     const useEffect(() =>{
    //         let tmp = 0;
    //     },[]);
    
    const ServiceEventsTable = (props)=>{
   
        const services = [
            {time:"2021-02-01", type: "[INFO]", message: "Usługa chodzi i ma się dobrze"},
            {time:"2021-02-01", type: "[WARN]", message: "Byewało lepiej"},
            {time:"2021-02-01", type: "[ERROR]", message: "Coś nie pykło"},
            {time:"2021-02-01", type: "[CRIT]", message: "Padła"},
            {time:"2021-02-01", type: "[INFO]", message: "Usługa chodzi i ma się dobrze"},
            {time:"2021-02-01", type: "[INFO]", message: "Usługa chodzi i ma się dobrze"},
            {time:"2021-02-01", type: "[INFO]", message: "Usługa chodzi i ma się dobrze"},
        ];

// TO DO dodać metodę a api do ściągnięcia wszystkich eventów dla logów
// TO DO obsłużyć kliknięcie z wykresu

        const headers =
        Object.keys(services[0]).map((k, i) => {
            return (
                <div className="header-item" key={i}>
                    {k[0].toUpperCase() + k.slice(1)}
                </div>
            )
        })
        

        const data = services.map((l, i)=>{
            return (
                <div key={i} className="logs-table-row" >
                    {Object.keys(services[0]).map((k,j)=>{
                        return(
                            <div className="log-item" key={j}>
                                {l[k]}
                            </div>
                        )
                    })}
                </div>
            )
        })

    return (
        <div className="log-table">
        <div className="logs-table-row logs-header">
             {headers}
        </div>
         {data}
     </div>
    )}

export default ServiceEventsTable;