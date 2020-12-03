import React from 'react'
import './Logs.css'

const logs = (props) => {
    
    
    const headers =
        Object.keys(props.children[0]).map((k, i) => {
            return (
                <th key={i}>
                    {k}
                </th>
            )
        })
    
    const data = props.children.map((l, i)=>{
            return (
                <tbody key={i}>
                    <tr >
                    {Object.keys(props.children[0]).map((k,j)=>{
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
            <table className="Logs">
               <thead>
               <tr key={0}>
                   {headers}
                </tr>
               </thead>
                {data}
            </table>
    )
}


export default logs;