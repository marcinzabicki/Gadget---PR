import {useState, useEffect, useContext} from 'react'
import { SignalRContext } from '../../../utils/signalr-context'
import { API } from '../../../utils/API'



const Logs = () => {

    const connection = useContext(SignalRContext);
    const [services, setServices] = useState([]);

    useEffect(() => {
        API.fetchLastEvents(10).then((response) => {
          setServices(response.data)
        });
      }, []);
      

    useEffect(() => {
        if (connection !== null) {
          connection.on("ServiceStatusChanged", (response) => {
              let updated = [...services];
              updated.unshift({agent:response.agent, service:response.name, createdAt:Date.now(), status:response.status});
              setServices(updated.slice(0,10));
          });
        }
        return function cleanup() {
            connection && connection.off("ServiceStatusChanged")
        }
      }, [connection, services]);

      if(services.length>0){
        const headers =
        Object.keys(services[0]).map((k, i) => {
            return (
                <th key={i}>
                    {k}
                </th>
            )
        })
    
    const data = services.map((l, i)=>{
            return (
                <tbody key={i}>
                    <tr >
                    {Object.keys(services[0]).map((k,j)=>{
                        return(
                            <td key={j}>
                                {l[k]}
                            </td>
                        )
                    })}
                </tr>
                </tbody>
            )
        })
    return (
            <table className="log-table">
               <thead>
               <tr key={0}>
                   {headers}
                </tr>
               </thead>
                {data}
            </table>
        )
    }
      return null;
}

export default Logs;