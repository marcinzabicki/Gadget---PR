import {useState, useEffect, useContext} from 'react'
import { SignalRContext } from '../../../utils/signalr-context'
import { API } from '../../../utils/API'
import Helpers from '../../../utils/Helpers'

const Logs = () => {

    const connection = useContext(SignalRContext);
    const [services, setServices] = useState([]);

      useEffect(() => {
        if (connection !== null) {
          const init = async () => {
            const response = await API.fetchMachineList();
           setServices(response.data)
          };
          connection.on("ServiceStatusChanged", (response) => {
            let updated = [...services];
            updated.unshift({agent:response.agent, service:response.name, createdAt:Helpers.formatDate(Date.now()), status:response.status});
            setServices(updated.slice(0,10));
          });
          init();
        }
    
        return () => {
          connection?.off("ServiceStatusChanged");
        };
      }, [connection]);
      

      if(services.length>0){
        const headers =
        Object.keys(services[0]).map((k, i) => {
            return (
                <div className="header-item" key={i}>
                    {k}
                </div>
            )
        })
    
    const data = services.map((l, i)=>{
            return (
                <div key={i} className="logs-table-row" >
                    {Object.keys(services[0]).map((k,j)=>{
                        return(
                            <div className="log-item" key={j}>
                                {Helpers.isDate(l[k]) ? Helpers.formatDate(l[k]) : l[k] }
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
        )
    }
      return null;
}

export default Logs;