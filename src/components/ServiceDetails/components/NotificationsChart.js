import React, { useState, useEffect, useContext } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid} from 'recharts';
//import { API } from "../../utils/API";

     //     const useEffect(() =>{
    //         let tmp = 0;
    //     },[]);

    const data = [
        {time:"2021-02-01", value:0.3 },
        {time:"2021-02-02", value:0.3 },
        {time:"2021-02-03", value:1 },
        {time:"2021-02-04", value:1 },
        {time:"2021-02-05", value:1, },
        {time:"2021-02-06", value:1, },
        {time:"2021-02-07", value:1 },
        {time:"2021-02-08", value:1 },
        {time:"2021-02-09", value:0.3},
        {time:"2021-02-10", value:0.3},
        {time:"2021-02-11", value:0.3 },
        {time:"2021-02-12", value:1 },
        {time:"2021-02-13", value:1},
        {time:"2021-02-14", value:1},
        {time:"2021-02-15", value:1},
        {time:"2021-02-16", value:1},
        {time:"2021-02-17", value:1 },
        {time:"2021-02-18", value:1 }
    ];
const lineStyle = {
  stroke:"#FFFFFF"
}
   
    const NotificationCharts = (props)=>{
   
        return (
            <div className="service-details-chart tile">   
        <LineChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="time"stroke="white" />
        <YAxis stroke="white" domain={[0, 1.5]} tick={false} />
        <text x={45} y={88} dy={8} fontSize="12" textAnchor="middle" fill={'#38E18D'}>Running</text>
        <text x={45} y={208} dy={8} fontSize="12" textAnchor="middle" fill={'#DE3143'}>Stopped</text>
        <Line style={lineStyle} type="monotone" stroke='#8884d8' strokeWidth={1} dot={false} dataKey="value" />
      </LineChart>
        </div>
        )}

    export default NotificationCharts;