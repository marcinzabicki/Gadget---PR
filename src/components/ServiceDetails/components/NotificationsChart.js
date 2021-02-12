import React, { useState, useEffect, useContext } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//import { API } from "../../utils/API";

     //     const useEffect(() =>{
    //         let tmp = 0;
    //     },[]);

    const data = [
        {time:"2021-02-01", info:23, error: 5, warn: 1, },
        {time:"2021-02-02", info:35, error: 3, warn: 3, },
        {time:"2021-02-03", info:21, error: 4, warn: 2, },
        {time:"2021-02-04", info:17, error: 7, warn: 5, },
        {time:"2021-02-05", info:29, error: 0, warn: 12, },
        {time:"2021-02-06", info:27, error: 9, warn: 11, },
        {time:"2021-02-07", info:23, error: 5, warn: 1, },
        {time:"2021-02-08", info:35, error: 3, warn: 3, },
        {time:"2021-02-09", info:21, error: 4, warn: 2, },
        {time:"2021-02-10", info:17, error: 7, warn: 5, },
        {time:"2021-02-11", info:29, error: 0, warn: 12, },
        {time:"2021-02-12", info:27, error: 9, warn: 11, },
        {time:"2021-02-13", info:23, error: 5, warn: 1, },
        {time:"2021-02-14", info:35, error: 3, warn: 3, },
        {time:"2021-02-15", info:21, error: 4, warn: 2, },
        {time:"2021-02-16", info:17, error: 7, warn: 5, },
        {time:"2021-02-17", info:29, error: 0, warn: 12, },
        {time:"2021-02-18", info:27, error: 9, warn: 11, }
    ];

    const handleClick = (time, type) => {
       console.log(time);
       console.log(type)
      };
    
    const NotificationCharts = (props)=>{
   
        return (
            <div>   
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="time" />
        <YAxis />
        {/* <Tooltip />
        <Legend /> */}
        <Bar stackId="a" dataKey="info">
            {data.map((entry, index) => (
              <Cell cursor="pointer" onClick={()=>handleClick(entry.time, "info")} fill="#38E18D" key={`cell-${index}`} />
            ))}
          </Bar>
          <Bar stackId="a" dataKey="warn">
            {data.map((entry, index) => (
              <Cell cursor="pointer" onClick={()=>handleClick(entry.time,"warn")} fill="#F0AD4E" key={`cell-${index}`} />
            ))}
          </Bar>
          <Bar stackId="a" dataKey="error">
            {data.map((entry, index) => (
              <Cell cursor="pointer" onClick={()=>handleClick(entry.time, "error")} fill="#DE3143" key={`cell-${index}`} />
            ))}
          </Bar>
      </BarChart>    
        </div>
        )}

    export default NotificationCharts;