import {useState, useEffect, useContext} from 'react'
import { SignalRContext } from '../../../utils/signalr-context'



const Logs = () => {

    const connection = useContext(SignalRContext);
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (connection !== null) {
          connection.on("ServiceStatusChanged", (response) => {
              console.log(response);
              let updated = [...services];
              updated.push(response);
              if(updated>10){
                  updated.length = 10;
              }
              setServices(updated);
              console.log(services);
          });
        }
      }, [connection, services]);

      if(services.length>0){
        const headers =
        Object.keys(services.children[0]).map((k, i) => {
            return (
                <th key={i}>
                    {k}
                </th>
            )
        })
    
    const data = services.children.map((l, i)=>{
            return (
                <tbody key={i}>
                    <tr >
                    {Object.keys(services.children[0]).map((k,j)=>{
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